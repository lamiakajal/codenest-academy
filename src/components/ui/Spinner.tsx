import { LogoMark } from "./Logo";

interface SpinnerProps {
  size?: number;
  label?: string;
}

// Round animated loader: two counter-rotating rings around the logo mark
export default function Spinner({ size = 96, label = "Loading" }: SpinnerProps) {
  return (
    <div
      className="loader"
      style={{ width: size, height: size }}
      role="status"
      aria-label={label}
    >
      <span className="loader-ring" />
      <span className="loader-ring-2" />
      <span className="loader-core">
        <LogoMark size={Math.round(size * 0.42)} />
      </span>
    </div>
  );
}
