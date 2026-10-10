import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center overflow-hidden pt-32 pb-24">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_10%,transparent_100%)]"
      />
      <div className="container-page">
        <p className="text-accent-400 font-mono text-xs tracking-[0.18em] uppercase">Error 404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page could not be found
        </h1>
        <p className="text-fg-muted mt-4 max-w-lg text-base leading-relaxed">
          The page you were looking for doesn&rsquo;t exist or has moved. Head back to the homepage
          to keep browsing.
        </p>
        <a
          href="./"
          className="bg-accent-600 hover:bg-accent-500 mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to homepage
        </a>
      </div>
    </div>
  );
}
