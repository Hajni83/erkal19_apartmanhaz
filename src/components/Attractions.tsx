"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Latnivalo = {
  nev: string;
  tav: string;
  leiras: string;
  icon: React.ReactNode;
};

const LATNIVALOK: Latnivalo[] = [
  {
    nev: "Festetics-kastély",
    tav: "1,5 km",
    leiras:
      "Magyarország egyik legszebb barokk kastélya gyönyörű parkkal, hintómúzeummal és a híres Helikon Könyvtárral.",
    icon: (
      <path d="M4 21V10l4-3v3l4-3 4 3V7l4 3v11M4 21h16M9 21v-4h6v4M12 3v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    nev: "Keszthelyi strandok",
    tav: "2 km",
    leiras:
      "A Városi strand, a Helikon strand és a Libás strand nyáron kristálytiszta balatoni fürdőzést kínál.",
    icon: (
      <path d="M3 16q4.5-4 9 0t9 0M3 20q4.5-4 9 0t9 0M12 4a5 5 0 0 1 5 5M12 4a5 5 0 0 0-5 5M12 4v8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    nev: "Hévízi tófürdő",
    tav: "8 km",
    leiras:
      "A világ legnagyobb termál tava – gyógyvize egész évben 24–38 °C-os, télen is felejthetetlen élmény.",
    icon: (
      <path d="M12 3c2.5 3 5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 2.5-6 5-9zM7 20q2.5-2 5 0t5 0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    nev: "Balatoni Múzeum",
    tav: "1,8 km",
    leiras:
      "Interaktív kiállítások a Balaton élővilágáról, történetéről és a tó körüli élet hagyományairól.",
    icon: (
      <path d="M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 18h18v3H3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    nev: "Kis-Balaton",
    tav: "15 km",
    leiras:
      "Páratlan madárvilágáról híres természetvédelmi terület – kerékpártúrák, tanösvények és a Kányavári-sziget.",
    icon: (
      <path d="M4 13c3-6 8-8 16-8-1 8-4 12-10 12-2 0-4-1-6-4zM4 13c-1 2-1.5 4-1.5 7M9 12c2 0 5-1 7-3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    nev: "Szigligeti vár",
    tav: "26 km",
    leiras:
      "Középkori várrom lélegzetelállító panorámával a Balatonra és a Badacsony vulkáni tanúhegyeire.",
    icon: (
      <path d="M5 21V8l2-2V4h2v2h2V4h2v2h2V4h2v2l2 2v13M5 21h14M10 21v-5h4v5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function Attractions() {
  return (
    <section id="latnivalok" className="bg-sand/40 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="Látnivalók"
          title="Felfedeznivalók a környéken"
          lead="Keszthely a Balaton nyugati kapuja – kastély, strandok, termál tó és festői táj mind karnyújtásnyira."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LATNIVALOK.map((l, i) => (
            <Reveal key={l.nev} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full rounded-2xl border border-sand bg-white p-6 shadow-sm hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-sand transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                      {l.icon}
                    </svg>
                  </span>
                  <span className="rounded-full bg-sand/70 px-3 py-1 text-xs font-bold text-navy">
                    {l.tav}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-navy">
                  {l.nev}
                </h3>
                <p className="text-sm leading-relaxed text-ink/65">{l.leiras}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
