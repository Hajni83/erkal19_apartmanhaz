"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Kep = { src: string; alt: string };

const KEPEK: Kep[] = [
  { src: "/images/haz.jpg", alt: "Az apartmanház utcafrontja" },
  { src: "/images/nappali.jpg", alt: "Nappali" },
  { src: "/images/haloszoba.jpg", alt: "Hálószoba pitypang faldekorral" },
  { src: "/images/udvar2.jpg", alt: "Belső udvar" },
  { src: "/images/konyha.jpg", alt: "Felszerelt konyha" },
  { src: "/images/szoba.jpg", alt: "Hálószoba" },
  { src: "/images/nappali4.jpg", alt: "Nappali részlet" },
  { src: "/images/udvar3.jpg", alt: "Kerti pihenő" },
  { src: "/images/szoba4.jpg", alt: "Hálószoba erkéllyel" },
  { src: "/images/bor.jpg", alt: "Borsarok" },
  { src: "/images/nappali2.jpg", alt: "Nappali" },
  { src: "/images/udvar4.jpg", alt: "Kert és grillező" },
  { src: "/images/haloszoba2.jpg", alt: "Hálószoba" },
  { src: "/images/konyha2.jpg", alt: "Konyha" },
  { src: "/images/nappali5.jpg", alt: "Nappali részlet" },
  { src: "/images/varrogep.jpg", alt: "Antik Singer varrógép" },
  { src: "/images/nappali6.jpg", alt: "Nappali téli kilátással" },
  { src: "/images/bor2.jpg", alt: "Borospolc" },
  { src: "/images/udvar-telen.jpg", alt: "Az udvar télen" },
  { src: "/images/szoba5.jpg", alt: "Szoba" },
  { src: "/images/nappali3.jpg", alt: "Nappali részlet" },
];

export default function Gallery() {
  const [aktiv, setAktiv] = useState<number | null>(null);

  const lepes = useCallback(
    (delta: number) => {
      setAktiv((akt) =>
        akt === null ? null : (akt + delta + KEPEK.length) % KEPEK.length
      );
    },
    []
  );

  useEffect(() => {
    if (aktiv === null) return;
    const kezelo = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAktiv(null);
      if (e.key === "ArrowRight") lepes(1);
      if (e.key === "ArrowLeft") lepes(-1);
    };
    window.addEventListener("keydown", kezelo);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", kezelo);
      document.body.style.overflow = "";
    };
  }, [aktiv, lepes]);

  return (
    <section id="galeria" className="bg-cream px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="Galéria"
          title="Képek az apartmanházról"
          lead="Nézzen körül nálunk – kattintson a képekre a nagyításhoz!"
        />

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {KEPEK.map((kep, i) => (
            <Reveal
              key={kep.src}
              delay={(i % 4) * 0.06}
              y={20}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setAktiv(i)}
                aria-label={`${kep.alt} – nagyítás`}
                className="group block w-full overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/15"
              >
                <img
                  src={kep.src}
                  alt={kep.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {aktiv !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-dark/95 p-4 backdrop-blur-sm"
            onClick={() => setAktiv(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Kép nagyítva"
          >
            <button
              type="button"
              onClick={() => setAktiv(null)}
              aria-label="Bezárás"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); lepes(-1); }}
              aria-label="Előző kép"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 md:left-6"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <motion.img
              key={aktiv}
              src={KEPEK[aktiv].src}
              alt={KEPEK[aktiv].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); lepes(1); }}
              aria-label="Következő kép"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 md:right-6"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-sand/80">
              {aktiv + 1} / {KEPEK.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
