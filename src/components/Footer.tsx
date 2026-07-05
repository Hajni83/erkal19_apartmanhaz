import Logo from "./Logo";
import { NAV_ITEMS, SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-navy-dark px-5 py-14 text-sand/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Logo variant="light" />

        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="max-w-md text-xs leading-relaxed">
          {SITE.cim} ·{" "}
          <a href={`mailto:${SITE.email}`} className="underline transition-colors hover:text-cream">
            {SITE.email}
          </a>
        </p>

        <div className="h-px w-24 bg-sand/20" />

        <p className="text-xs">
          © {new Date().getFullYear()} {SITE.nev}. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
