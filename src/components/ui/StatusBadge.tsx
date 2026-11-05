const STYLES: Record<string, string> = {
  pending: "bg-warm/20 text-warm",
  contacted: "bg-brand/15 text-brand",
  confirmed: "bg-accent/15 text-accent",
};

// Small colored pill that shows an enrollment status
export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${STYLES[status] ?? "bg-surface-2 text-muted"}`}>
      {status}
    </span>
  );
}
