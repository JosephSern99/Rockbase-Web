export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-[50vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary motion-reduce:animate-none" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
