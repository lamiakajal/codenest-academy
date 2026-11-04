interface FormMessageProps {
  type: "success" | "error";
  message: string;
}

// Inline success or error banner shown under a form
export default function FormMessage({ type, message }: FormMessageProps) {
  return (
    <p
      role={type === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${
        type === "success"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-red-500/40 bg-red-500/10 text-red-500"
      }`}
    >
      {message}
    </p>
  );
}
