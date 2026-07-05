type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function LogoMark({
  className = "h-10 w-10",
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* háztető */}
      <path
        d="M10 34 L32 14 L54 34"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* kémény */}
      <path
        d="M45 20 V13 h5 v11"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* házfal jelzés */}
      <path
        d="M16 30 V44 M48 30 V44"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 19-es szám */}
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="17"
        fontWeight="bold"
        fill={stroke}
        stroke="none"
      >
        19
      </text>
      {/* balatoni hullám */}
      <path
        d="M12 52 q5 -5 10 0 t10 0 t10 0 t10 0"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const main = variant === "dark" ? "text-navy" : "text-cream";
  const sub = variant === "dark" ? "text-teal" : "text-sand-dark";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={`h-11 w-11 shrink-0 ${main}`} />
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-xl font-bold tracking-wide ${main}`}>
          Erkel 19
        </span>
        <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${sub}`}>
          Apartmanház · Keszthely
        </span>
      </span>
    </span>
  );
}
