"use client";

import { useEffect } from "react";

// Only renders if the root layout itself throws — replaces the entire
// document, so it needs its own <html>/<body> (can't rely on layout.tsx).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body
        style={{ background: "#020617", color: "#F8FAFC" }}
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center font-sans"
      >
        <p style={{ color: "#DC2626" }} className="text-sm font-semibold tracking-wide uppercase">
          Error
        </p>
        <h1 className="text-4xl font-semibold">Something went wrong.</h1>
        <p style={{ color: "#94A3B8" }}>The application hit an unexpected error.</p>
        <button
          onClick={() => reset()}
          style={{ background: "#0EA5E9", color: "#020617" }}
          className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
