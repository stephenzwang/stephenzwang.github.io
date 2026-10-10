"use client";

import { useEffect, useRef } from "react";

/**
 * Animated hero backdrop — a slowly drifting three-dimensional point cloud.
 *
 * Deliberately restrained: a single accent hue, no post-processing, low
 * particle count, and a soft depth fade so the field reads as atmosphere
 * rather than decoration. It sits behind the hero copy at low opacity and is
 * purely decorative (`aria-hidden`).
 *
 * Accessibility / performance:
 *  - The reduced-motion preference is deliberately not honoured (see the note
 *    in `app/globals.css`), so the loop always runs.
 *  - The animation loop is suspended while the tab is hidden.
 *  - Device pixel ratio is capped so 3x displays do not render 9x the pixels.
 *  - Everything is disposed on unmount — geometries, material, renderer.
 */
export function HeroBackdrop({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /*
     * `three` is a large dependency and this effect only ever runs in the
     * browser, so it is imported lazily — it never enters the server bundle
     * and is fetched as its own chunk after the hero paints.
     */
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        // No WebGL available (older browser, blocked GPU). Leave the CSS
        // backdrop in place and bail out silently.
        return;
      }

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height, false);
      renderer.setClearAlpha(0);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05080e, 0.055);

      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.set(0, 0, 14);

      /* --------------------------------------------------------------------
       * Point cloud — a rounded box volume so the field has depth without a
       * hard spherical edge. Colours are pulled from the site's own accent
       * ramp so the backdrop can never drift off-palette.
       * ------------------------------------------------------------------ */
      const COUNT = 900;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      const accent = new THREE.Color("#3d82ff");
      const accentLight = new THREE.Color("#9dc2ff");
      const cyan = new THREE.Color("#22d3ee");

      const spread = { x: 22, y: 13, z: 12 };

      for (let i = 0; i < COUNT; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * spread.x;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;

        // Mostly accent, with a minority of cyan and light-blue highlights.
        const pick = Math.random();
        const color = pick < 0.6 ? accent : pick < 0.82 ? cyan : accentLight;

        // Fade toward the volume edge so particles dissolve rather than stop.
        const depth = 1 - Math.abs(positions[i * 3 + 2]) / (spread.z / 2);
        const alpha = 0.25 + depth * 0.75;

        colors[i * 3] = color.r * alpha;
        colors[i * 3 + 1] = color.g * alpha;
        colors[i * 3 + 2] = color.b * alpha;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      /*
       * A radial-gradient sprite beats a hard square point, especially at the
       * larger sizes in the foreground. Drawn to a canvas at runtime so there
       * is no extra asset to ship.
       */
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const ctx = spriteCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.35, "rgba(255,255,255,0.65)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const sprite = new THREE.CanvasTexture(spriteCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.14,
        map: sprite,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      /* A second, sparser layer far behind the first adds parallax depth. */
      const farCount = 380;
      const farPositions = new Float32Array(farCount * 3);
      for (let i = 0; i < farCount; i += 1) {
        farPositions[i * 3] = (Math.random() - 0.5) * 40;
        farPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
        farPositions[i * 3 + 2] = (Math.random() - 0.5) * 26 - 8;
      }
      const farGeometry = new THREE.BufferGeometry();
      farGeometry.setAttribute("position", new THREE.BufferAttribute(farPositions, 3));
      const farMaterial = new THREE.PointsMaterial({
        size: 0.075,
        map: sprite,
        color: new THREE.Color("#6ba4ff"),
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const farPoints = new THREE.Points(farGeometry, farMaterial);
      scene.add(farPoints);

      /* --------------------------------------------------------------------
       * Pointer parallax — the camera leans toward the cursor. Intentionally
       * small; this should register as depth, not as movement.
       * ------------------------------------------------------------------ */
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };

      const onPointerMove = (event: PointerEvent) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 2;
        target.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      /*
       * Scroll-linked motion. The canvas is anchored to the hero, so this reads
       * as the cloud drifting, rotating and receding as the hero leaves the
       * viewport — a genuine scroll-driven WebGL effect rather than idle drift.
       */
      let scrollProgress = 0;
      const onScroll = () => {
        const span = container.clientHeight || window.innerHeight;
        scrollProgress = Math.min(window.scrollY / Math.max(1, span), 1.5);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      window.addEventListener("resize", onResize);

      let frame = 0;
      let running = true;
      /*
       * `Timer` replaces the deprecated `Clock`. Connecting it to the document
       * lets it use the Page Visibility API, so restoring a backgrounded tab
       * cannot produce one enormous delta and jump the field.
       */
      const timer = new THREE.Timer();
      timer.connect(document);

      const renderFrame = (elapsed: number) => {
        // Ease the pointer so the camera never snaps.
        pointer.x += (target.x - pointer.x) * 0.035;
        pointer.y += (target.y - pointer.y) * 0.035;

        camera.position.x = pointer.x * 1.1;
        camera.position.y = -pointer.y * 0.8 - scrollProgress * 1.4;
        camera.position.z = 14 - scrollProgress * 2.4;
        camera.lookAt(0, 0, 0);

        // Slow counter-drift keeps the field alive without visible looping;
        // scroll adds a second, larger drift on top of it.
        points.rotation.y = elapsed * 0.026 + scrollProgress * 0.38;
        points.rotation.x = Math.sin(elapsed * 0.11) * 0.05;
        points.rotation.z = scrollProgress * 0.09;
        farPoints.rotation.y = -elapsed * 0.014 + scrollProgress * 0.2;

        renderer.render(scene, camera);
      };

      const animate = () => {
        if (!running) return;
        frame = window.requestAnimationFrame(animate);
        timer.update();
        renderFrame(timer.getElapsed());
      };

      const onVisibilityChange = () => {
        if (document.hidden) {
          running = false;
          window.cancelAnimationFrame(frame);
        } else {
          running = true;
          animate();
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      animate();

      cleanup = () => {
        running = false;
        window.cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibilityChange);

        geometry.dispose();
        material.dispose();
        farGeometry.dispose();
        farMaterial.dispose();
        sprite.dispose();
        timer.disconnect();
        timer.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
