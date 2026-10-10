#!/usr/bin/env node
/**
 * Run the portfolio's dev server, and open it once the server answers.
 *
 * This is what `npm run dev` runs, and therefore what the desktop shortcut
 * ("Portfolio Platform (dev).lnk") runs. One file, so the port is decided in one
 * place and the browser is opened in one place.
 *
 * ## Why this exists at all
 *
 * `next dev` has no `--open` flag (checked against 16.3.8), and opening the page
 * from the shortcut would fire before the first compile finishes — a connection
 * error that reads as a broken app rather than impatience. So the waiting lives
 * here, in the project, and the shortcut stays the plain `cmd /k npm run dev`
 * shape it shares with the other dev shortcuts on this machine.
 *
 * ## Why the port is chosen here rather than pinned in `package.json`
 *
 * `next dev -p <port>` **fails outright** when the port is busy:
 *
 *     ⨯ Failed to start server
 *     Error: listen EADDRINUSE: address already in use :::3003
 *
 * Next only walks forward to the next port when the port came from its own
 * default — in `cli/next-dev.js`, `allowRetry = portSource === 'default'`, and
 * `server/lib/start-server.js` honours that flag. Naming a port, by `-p` or by
 * `PORT`, makes a busy port fatal. A pinned port is exactly the thing that
 * cannot step aside, so the picking has to happen out here.
 *
 * ## Why the port probe checks three addresses
 *
 * On Linux a wildcard bind and a specific-address bind on the same port collide,
 * so one probe answers for all. **Windows allows both to exist.** A probe of
 * `127.0.0.1` alone reports a port free while a dev server already holds it on
 * every interface, and a probe of `::` alone misses a loopback holder — which
 * matters because the URL opened is `http://localhost:<port>`, and `localhost`
 * resolves to either family. The port is only free when every address is free.
 *
 * ## The window this cannot close
 *
 * The probe is released before Next binds, so anything that takes the port in
 * between still wins. That is the same window Next's own retry has; there is no
 * portable way to hand a listening socket to `next dev`.
 *
 * Plain Node, no dependency.
 */

import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));

/**
 * The port this app would like. Only a preference — it steps aside when busy.
 *
 * 3000 / 3001 / 3002 are taken by the sibling projects on this machine
 * (crawler suite, webcodelive, job-search), so 3003 keeps the portfolio from
 * being the reason one of those moves.
 */
const PREFERRED_PORT = 3003;

const MAX_PORT = 65_535;
const DEFAULT_ATTEMPTS = 10;

/** Every address a dev server on this port could be reached at. */
const PROBE_HOSTS = [undefined, '127.0.0.1', '::1'];

/**
 * Errors meaning the address itself does not exist here, so there is nothing to
 * collide with. Everything else — `EADDRINUSE`, `EACCES`, or an error this code
 * has never seen — counts as taken: a probe that cannot explain itself must not
 * be the reason we bind a port something else is already on.
 */
const NO_SUCH_ADDRESS = new Set(['EADDRNOTAVAIL', 'EAFNOSUPPORT', 'ENODEV', 'EINVAL']);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/* -------------------------------------------------------------------------- */
/* Port picking                                                                */
/* -------------------------------------------------------------------------- */

function probeHost(port, host) {
  return new Promise((done) => {
    const probe = createServer();
    // Never hold the event loop open: this runs just before we spawn a long-lived child.
    probe.unref();

    probe.once('error', (error) =>
      done(NO_SUCH_ADDRESS.has(error?.code ?? '') ? 'absent' : 'taken'),
    );
    probe.once('listening', () => probe.close(() => done('free')));

    probe.listen(host === undefined ? { port } : { port, host });
  });
}

/** Sequential, so the probes cannot collide with each other. */
async function isPortFree(port) {
  for (const host of PROBE_HOSTS) {
    if ((await probeHost(port, host)) === 'taken') return false;
  }
  return true;
}

/** Last resort, so a crowded low-port range still starts. */
async function ephemeralPort(tries = 5) {
  for (let attempt = 0; attempt < tries; attempt += 1) {
    const candidate = await new Promise((done, fail) => {
      const probe = createServer();
      probe.unref();
      probe.once('error', fail);
      probe.once('listening', () => {
        const address = probe.address();
        const port = typeof address === 'object' && address !== null ? address.port : null;
        probe.close(() => (port === null ? fail(new Error('no port from the OS')) : done(port)));
      });
      probe.listen({ port: 0 });
    });

    if (await isPortFree(candidate)) return candidate;
  }

  throw new Error('could not find a free port');
}

/** Walk forward from the preference — nearest neighbour is the value a human remembers. */
async function findFreePort(preferred) {
  for (let offset = 0; offset < DEFAULT_ATTEMPTS; offset += 1) {
    const candidate = preferred + offset;
    if (candidate > MAX_PORT) break;
    if (await isPortFree(candidate)) return candidate;
  }

  return ephemeralPort();
}

/**
 * An explicit `PORT` wins **unchecked** — someone pointing a tool at a fixed
 * port is asking for that port, and a named port that is busy should fail loudly
 * rather than silently move and have you debug the wrong server.
 */
async function resolvePort() {
  const override = Number.parseInt(process.env.PORT ?? '', 10);
  if (Number.isInteger(override) && override > 0 && override <= MAX_PORT) {
    return { port: override, source: 'PORT' };
  }

  const port = await findFreePort(PREFERRED_PORT);
  return { port, source: port === PREFERRED_PORT ? 'preferred' : 'free' };
}

/* -------------------------------------------------------------------------- */
/* Opening the browser                                                         */
/* -------------------------------------------------------------------------- */

/** Any HTTP status counts — a 404 still means the server is up. */
async function answers(url, timeoutMs = 1_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    await fetch(url, { signal: controller.signal, redirect: 'manual' });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Poll, do not sleep a fixed amount: the first compile is slow, the rest are fast. */
async function waitForServer(url, { timeoutMs = 120_000, intervalMs = 500, isStopped } = {}) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (isStopped?.() === true) return null;
    if (await answers(url)) return url;
    if (isStopped?.() === true) return null;
    await sleep(intervalMs);
  }

  return null;
}

/**
 * Hand the URL to the default browser.
 *
 * Three things here stop this closing a browser that is already open, and the
 * first two must not be "simplified" away:
 *
 * 1. `cmd /c start` goes through Windows' `ShellExecute`, so the browser is
 *    launched by Explorer and is **not in our process tree at all**. When a
 *    browser is already running, `start` gives it the URL as a new tab.
 * 2. `detached: true` puts it in its own process group, so Ctrl+C in the dev
 *    window — which signals the console's whole group — does not reach it.
 * 3. `unref()` stops the runner waiting on it or being held open by it.
 *
 * There is deliberately no `taskkill /T` anywhere: killing a process *tree* is
 * the one pattern that would take the browser down with the dev server.
 *
 * `start`'s first argument is the window title — the empty string is required,
 * or it treats a quoted URL as the title and opens nothing.
 */
function openBrowser(url) {
  const [command, args] =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', url]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]];

  try {
    const child = spawn(command, args, { detached: true, stdio: 'ignore' });
    child.on('error', () => undefined);
    child.unref();
    return true;
  } catch {
    return false;
  }
}

/** Off in CI and off when asked — a browser in an unattended job is a nuisance. */
function shouldOpenBrowser(env = process.env) {
  if (env.NO_OPEN === '1') return false;
  if (env.CI !== undefined && env.CI !== '' && env.CI !== 'false') return false;
  return true;
}

/* -------------------------------------------------------------------------- */
/* Run                                                                         */
/* -------------------------------------------------------------------------- */

let stopping = false;
let announcedUrl = null;
let scanBuffer = '';

/** Next's `- Local: http://localhost:<port>` line is the only statement of what was bound. */
function scan(chunk) {
  if (announcedUrl !== null) return;

  // Strip ANSI first: a regex tolerating an escape inside the URL is not worth writing.
  scanBuffer = (scanBuffer + String(chunk)).replace(/\u001b\[[0-9;]*m/g, '');

  const match = /http:\/\/localhost:(\d{1,5})/.exec(scanBuffer);
  if (match !== null) announcedUrl = match[0];

  // This runs for the life of the server and must not grow.
  if (scanBuffer.length > 8192) scanBuffer = scanBuffer.slice(-1024);
}

const { port, source } = await resolvePort();
const appUrl = `http://localhost:${port}`;

console.log('\n▶ Portfolio Platform (next dev)');

if (source === 'PORT') {
  console.log(`[dev] using :${port} — PORT was set explicitly, so it is taken as given.`);
} else if (source === 'free') {
  console.log(`[dev] :${PREFERRED_PORT} is in use — using :${port} instead.`);
}

// `npm exec` rather than a bare `next`: npm only puts `node_modules/.bin` on PATH
// for the scripts *it* runs, so a bare name resolves under `npm run dev` and fails
// when this file is run directly — a bug invisible from the shortcut.
//
// The port goes through the environment rather than `-p`; Next declares its port
// option as `.default(3000).env('PORT')`, so both reach the same field.
const child = spawn('npm', ['exec', '--', 'next', 'dev'], {
  cwd: projectRoot,
  shell: true,
  // stdin inherited so Next can read keys; stdout/stderr piped so the URL can be
  // read out of them. FORCE_COLOR keeps the output styled through the pipe.
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, PORT: String(port), FORCE_COLOR: process.env.FORCE_COLOR ?? '1' },
});

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  scan(chunk);
});
child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
  scan(chunk);
});

child.on('error', (error) => {
  console.error(`[dev] could not start the app: ${error.message}`);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});

// Deliberately NOT killing the child: it is attached to this console, so the
// user's Ctrl+C already reaches it and its descendants. Killing on top of that
// would terminate the `cmd.exe` wrapper and orphan `next` holding the port. This
// handler exists only so the "is it up yet?" poll stops immediately.
process.on('SIGINT', () => {
  stopping = true;
});
process.on('SIGTERM', () => {
  stopping = true;
});

async function resolveAppUrl() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (announcedUrl !== null) return announcedUrl;
    if (stopping) return null;
    await sleep(200);
  }

  console.log(`[dev] could not read the server's URL from its output; trying ${appUrl} anyway.`);
  return appUrl;
}

async function openWhenReady() {
  const url = await resolveAppUrl();
  if (url === null) return;

  const announcedPort = /:(\d{1,5})$/.exec(url)?.[1] ?? null;
  if (announcedPort !== null && Number(announcedPort) !== port) {
    console.log(`[dev] Next bound :${announcedPort}, not the :${port} it was given — using what it announced.`);
  }

  const ready = await waitForServer(url, { isStopped: () => stopping });
  if (ready === null) return;

  console.log(`[dev] ${ready} is up — opening it`);
  openBrowser(ready);
}

if (shouldOpenBrowser()) {
  void openWhenReady();
} else {
  console.log('[dev] not opening a browser (NO_OPEN=1 or CI is set)');
}
