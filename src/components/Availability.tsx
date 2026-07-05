"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Idoszak = { start: string; end: string };

const HONAPOK = [
  "Január", "Február", "Március", "Április", "Május", "Június",
  "Július", "Augusztus", "Szeptember", "Október", "November", "December",
];

const NAPOK = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];

function datumKulcs(ev: number, honap: number, nap: number): string {
  return `${ev}-${String(honap + 1).padStart(2, "0")}-${String(nap).padStart(2, "0")}`;
}

/** A foglalt időszakokat nap-szintű halmazzá bontja. */
function foglaltNapok(idoszakok: Idoszak[]): Set<string> {
  const napok = new Set<string>();
  for (const { start, end } of idoszakok) {
    const [sy, sm, sd] = start.split("-").map(Number);
    const [ey, em, ed] = end.split("-").map(Number);
    if (!sy || !ey) continue;
    const d = new Date(sy, sm - 1, sd);
    const vege = new Date(ey, em - 1, ed);
    let vedelem = 0;
    while (d <= vege && vedelem < 1000) {
      napok.add(datumKulcs(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setDate(d.getDate() + 1);
      vedelem++;
    }
  }
  return napok;
}

export default function Availability() {
  const ma = useMemo(() => new Date(), []);
  const [ev, setEv] = useState(ma.getFullYear());
  const [honap, setHonap] = useState(ma.getMonth());
  const [irany, setIrany] = useState(1);
  const [idoszakok, setIdoszakok] = useState<Idoszak[]>([]);
  const [demo, setDemo] = useState(false);
  const [allapot, setAllapot] = useState<"betoltes" | "kesz" | "hiba">("betoltes");

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setIdoszakok(data.bookings ?? []);
        setDemo(Boolean(data.demo));
        setAllapot("kesz");
      })
      .catch(() => setAllapot("hiba"));
  }, []);

  const foglalt = useMemo(() => foglaltNapok(idoszakok), [idoszakok]);

  // Navigációs korlátok: aktuális hónaptól legfeljebb 18 hónapra előre.
  const minIndex = ma.getFullYear() * 12 + ma.getMonth();
  const aktIndex = ev * 12 + honap;
  const lephetVissza = aktIndex > minIndex;
  const lephetElore = aktIndex < minIndex + 18;

  const lepes = (delta: number) => {
    const uj = new Date(ev, honap + delta, 1);
    setIrany(delta);
    setEv(uj.getFullYear());
    setHonap(uj.getMonth());
  };

  // Naptár rács: hétfői kezdés.
  const elsoNap = new Date(ev, honap, 1);
  const napokSzama = new Date(ev, honap + 1, 0).getDate();
  const kezdoOffset = (elsoNap.getDay() + 6) % 7;
  const cellak: (number | null)[] = [
    ...Array<null>(kezdoOffset).fill(null),
    ...Array.from({ length: napokSzama }, (_, i) => i + 1),
  ];

  const maKulcs = datumKulcs(ma.getFullYear(), ma.getMonth(), ma.getDate());

  return (
    <section id="naptar" className="bg-teal-light/50 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          kicker="Foglaltság"
          title="Szabad időpontok"
          lead="Nézd meg naptárunkban, mely napok szabadok, majd írj nekünk az űrlapon – 24 órán belül visszajelzünk."
        />

        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy/10">
            {/* fejléc: hónap léptetés */}
            <div className="flex items-center justify-between bg-navy px-6 py-4">
              <button
                onClick={() => lepes(-1)}
                disabled={!lephetVissza}
                aria-label="Előző hónap"
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/15 disabled:opacity-25"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`${ev}-${honap}`}
                  initial={{ opacity: 0, x: irany * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: irany * -24 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-lg font-bold text-cream"
                >
                  {ev}. {HONAPOK[honap]}
                </motion.h3>
              </AnimatePresence>
              <button
                onClick={() => lepes(1)}
                disabled={!lephetElore}
                aria-label="Következő hónap"
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/15 disabled:opacity-25"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="p-5 md:p-7">
              {allapot === "betoltes" && (
                <p className="py-16 text-center text-sm text-ink/50">
                  Naptár betöltése…
                </p>
              )}

              {allapot === "hiba" && (
                <p className="py-16 text-center text-sm text-booked">
                  A naptár jelenleg nem érhető el. Kérjük, próbáld újra később,
                  vagy keress minket a kapcsolat űrlapon!
                </p>
              )}

              {allapot === "kesz" && (
                <>
                  <div className="mb-2 grid grid-cols-7 text-center">
                    {NAPOK.map((n, i) => (
                      <span
                        key={n}
                        className={`py-1 text-xs font-bold uppercase tracking-wide ${
                          i >= 5 ? "text-teal" : "text-ink/40"
                        }`}
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${ev}-${honap}`}
                      initial={{ opacity: 0, x: irany * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: irany * -40 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-7 gap-1.5"
                    >
                      {cellak.map((nap, i) => {
                        if (nap === null) return <span key={`u-${i}`} />;
                        const kulcs = datumKulcs(ev, honap, nap);
                        const mult = kulcs < maKulcs;
                        const isFoglalt = foglalt.has(kulcs);
                        const isMa = kulcs === maKulcs;

                        let stilus =
                          "bg-teal-light/70 text-teal-dark font-semibold";
                        if (mult) {
                          stilus = "bg-transparent text-ink/25";
                        } else if (isFoglalt) {
                          stilus = "bg-booked/10 text-booked/70 line-through";
                        }

                        return (
                          <span
                            key={kulcs}
                            title={
                              mult
                                ? undefined
                                : isFoglalt
                                  ? "Foglalt"
                                  : "Szabad"
                            }
                            className={`relative flex aspect-square items-center justify-center rounded-xl text-sm transition-transform hover:scale-105 ${stilus} ${
                              isMa ? "ring-2 ring-navy/60" : ""
                            }`}
                          >
                            {nap}
                          </span>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>

                  {/* jelmagyarázat */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-sand pt-5 text-xs font-semibold text-ink/60">
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-md bg-teal-light ring-1 ring-teal/30" />
                      Szabad
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-md bg-booked/15 ring-1 ring-booked/40" />
                      Foglalt
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-md ring-2 ring-navy/60" />
                      Mai nap
                    </span>
                  </div>

                  {demo && (
                    <p className="mt-4 rounded-xl bg-wood/10 px-4 py-3 text-center text-xs text-wood">
                      Bemutató adatok – a valós naptárhoz állítsd be a Sanity
                      projektet (lásd README).
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <a
            href="#kapcsolat"
            className="inline-block rounded-full bg-teal px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-dark"
          >
            Időpont foglalása
          </a>
        </Reveal>
      </div>
    </section>
  );
}
