import Spinner from "@/components/ui/Spinner";

// Shown by Next.js automatically while any page is loading
export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-5">
        <Spinner size={96} />
        <p className="text-sm font-medium text-muted">Loading the page...</p>
      </div>
    </div>
  );
}
