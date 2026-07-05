"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Apartman = {
  nev: string;
  kep: string;
  szin: string;
  agyak: { hely: string; agy: string }[];
  kiemelt: string[];
  maxVendeg: number;
  ar: string;
  arMegjegyzes: string;
};

/** Teljes felszereltség – a „Több felszereltség” alatt jelenik meg. */
const FELSZERELTSEG_TELJES = [
  "Konyha", "Széf", "Mosógép", "Internetes filmnézés (pl. Netflix)", "Vécé",
  "Kanapé", "Fürdőkád vagy zuhanykabin", "Fapadló / parketta", "Törölközők",
  "Ágynemű", "Konnektor az ágy közelében", "Takarítószerek",
  "Járólap / márványpadló", "Etetőszék", "Ülősarok", "Saját bejárat", "Tévé",
  "Hűtőszekrény", "Szúnyogháló", "Műholdas csatornák", "Tea- és kávéfőző",
  "Vasaló", "Rádió", "Mikrohullámú sütő", "Fűtés", "Hajszárító",
  "Konyhai felszerelés", "Vízforraló", "Kültéri bútorok", "Kültéri étkező",
  "Kábeltévé", "Ruhásszekrény", "Sütő", "Főzőlap", "Kenyérpirító", "Étkező",
  "Étkezőasztal", "A felső szintek csak lépcsőn közelíthetők meg",
  "Különlakás az épületben", "Ruhaszárító állvány", "Vécépapír",
  "Társasjátékok / kirakós játékok", "Könyv, DVD vagy zene gyerekeknek",
  "Kanapéágy", "Szén-monoxid érzékelő",
];

const APARTMANOK: Apartman[] = [
  {
    nev: "Apartman 3 hálószobával",
    kep: "/images/szoba.jpg",
    szin: "from-navy to-teal-dark",
    agyak: [
      { hely: "Hálószoba 1", agy: "1 franciaágy" },
      { hely: "Hálószoba 2", agy: "1 kanapéágy" },
      { hely: "Hálószoba 3", agy: "1 egyszemélyes ágy" },
    ],
    kiemelt: [
      "Önálló apartman", "70 m²", "Saját konyha", "Saját fürdőszoba",
      "Erkély", "Kertre nyíló kilátás", "Belső udvarra nyíló kilátás",
      "Légkondicionálás", "Kültéri pihenősarok", "Mosogatógép",
      "Síkképernyős tévé", "Grillsütő", "Terasz", "Kávéfőző", "Ingyen wifi",
    ],
    maxVendeg: 2,
    ar: "148 390 Ft",
    arMegjegyzes: "3 éjszakára · tartalmazza az adókat és díjakat",
  },
  {
    nev: "2 hálószobás apartman, kilátással a kertre",
    kep: "/images/haloszoba.jpg",
    szin: "from-teal to-teal-dark",
    agyak: [
      { hely: "Hálószoba 1", agy: "1 franciaágy" },
      { hely: "Hálószoba 2", agy: "1 franciaágy" },
      { hely: "Nappali", agy: "1 kanapéágy" },
    ],
    kiemelt: [
      "Önálló apartman", "67 m²", "Saját konyha", "Saját fürdőszoba",
      "Erkély", "Kertre nyíló kilátás", "Belső udvarra nyíló kilátás",
      "Légkondicionálás", "Kültéri pihenősarok", "Mosogatógép",
      "Síkképernyős tévé", "Grillsütő", "Terasz", "Kávéfőző", "Ingyen wifi",
    ],
    maxVendeg: 2,
    ar: "148 390 Ft",
    arMegjegyzes: "3 éjszakára · tartalmazza az adókat és díjakat",
  },
];

function ApartmanKartya({
  apartman,
  index,
}: {
  apartman: Apartman;
  index: number;
}) {
  const [nyitva, setNyitva] = useState(false);

  return (
    <Reveal delay={index * 0.15}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10"
      >
        {/* kép – ha hiányzik a fájl, a színátmenet látszik */}
        <div className={`relative h-60 overflow-hidden bg-gradient-to-br ${apartman.szin}`}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${apartman.kep}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl font-bold text-cream drop-shadow">
            {apartman.nev}
          </h3>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* ágyak */}
          <ul className="mb-5 space-y-1.5">
            {apartman.agyak.map((a) => (
              <li key={a.hely} className="flex items-center gap-2.5 text-sm text-ink/75">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18v2M21 18v2M3 15h18M7 10V8h5v2" />
                </svg>
                <span>
                  <strong className="text-navy">{a.hely}:</strong> {a.agy}
                </span>
              </li>
            ))}
          </ul>

          {/* kiemelt jellemzők */}
          <ul className="mb-4 flex flex-wrap gap-2">
            {apartman.kiemelt.map((k) => (
              <li key={k} className="rounded-full bg-teal-light px-3 py-1 text-xs font-bold text-teal-dark">
                {k}
              </li>
            ))}
          </ul>

          {/* teljes felszereltség – lenyitható */}
          <button
            type="button"
            onClick={() => setNyitva((v) => !v)}
            aria-expanded={nyitva}
            className="mb-4 flex items-center gap-1.5 self-start text-sm font-bold text-teal transition-colors hover:text-teal-dark"
          >
            {nyitva ? "Kevesebb felszereltség" : "Több felszereltség"}
            <motion.svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: nyitva ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {nyitva && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5 overflow-hidden"
              >
                {FELSZERELTSEG_TELJES.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-ink/65">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* ár és foglalás */}
          <div className="mt-auto border-t border-sand pt-5">
            <p className="mb-3 flex items-center gap-2 text-sm text-ink/60">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M3 20a6 6 0 0 1 12 0M16 5a3.5 3.5 0 0 1 0 6.8M21 20a6 6 0 0 0-4.5-5.7" />
              </svg>
              Vendégek maximális száma: {apartman.maxVendeg}
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p>
                <span className="font-display text-3xl font-bold text-navy">
                  {apartman.ar}
                </span>
                <span className="mt-0.5 block text-xs text-ink/55">
                  {apartman.arMegjegyzes}
                </span>
              </p>
              <a
                href="#kapcsolat"
                className="rounded-full bg-teal px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-dark"
              >
                Foglalás
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Rooms() {
  return (
    <section id="szobak" className="bg-sand/40 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="Szobák"
          title="Szállásajánlataink"
          lead="Válassza ki, melyikből hányat foglalna le – az ajánlatkéréshez kattintson a Foglalás gombra, és írja meg, melyik apartmant, milyen időpontra szeretné."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {APARTMANOK.map((apartman, i) => (
            <ApartmanKartya key={apartman.nev} apartman={apartman} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
