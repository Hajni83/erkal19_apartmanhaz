"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SITE } from "@/lib/config";

type Allapot = "alap" | "kuldes" | "siker" | "hiba";

const inputStilus =
  "w-full rounded-xl border border-sand bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink/35 focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/20";

export default function Contact() {
  const [allapot, setAllapot] = useState<Allapot>("alap");

  async function kuldes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const adatok = Object.fromEntries(new FormData(form).entries());
    setAllapot("kuldes");
    try {
      const valasz = await fetch(
        `https://formsubmit.co/ajax/${SITE.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...adatok,
            _subject: "Új érdeklődés – Erkel 19 Apartmanház",
            _template: "table",
          }),
        }
      );
      if (!valasz.ok) throw new Error();
      form.reset();
      setAllapot("siker");
    } catch {
      setAllapot("hiba");
    }
  }

  return (
    <section id="kapcsolat" className="bg-cream px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="Kapcsolat"
          title="Írj nekünk!"
          lead="Kérdésed van, vagy foglalnál? Töltsd ki az űrlapot, és hamarosan jelentkezünk."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* űrlap */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={kuldes}
              className="rounded-3xl border border-sand bg-white p-7 shadow-lg shadow-navy/5 md:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    Név *
                  </span>
                  <input name="nev" required placeholder="Teljes neved" className={inputStilus} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    E-mail *
                  </span>
                  <input name="email" type="email" required placeholder="pelda@email.hu" className={inputStilus} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    Telefonszám
                  </span>
                  <input name="telefon" type="tel" placeholder="+36 ..." className={inputStilus} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    Vendégek száma
                  </span>
                  <input name="vendegek" type="number" min="1" max="8" placeholder="2" className={inputStilus} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    Érkezés
                  </span>
                  <input name="erkezes" type="date" className={inputStilus} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                    Távozás
                  </span>
                  <input name="tavozas" type="date" className={inputStilus} />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy">
                  Üzenet *
                </span>
                <textarea
                  name="uzenet"
                  required
                  rows={4}
                  placeholder="Írd le, miben segíthetünk…"
                  className={`${inputStilus} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={allapot === "kuldes"}
                className="mt-6 w-full rounded-full bg-teal py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-dark disabled:translate-y-0 disabled:opacity-60"
              >
                {allapot === "kuldes" ? "Küldés folyamatban…" : "Üzenet küldése"}
              </button>

              {allapot === "siker" && (
                <p className="mt-4 rounded-xl bg-teal-light px-4 py-3 text-center text-sm font-semibold text-teal-dark">
                  Köszönjük! Üzenetedet megkaptuk, hamarosan válaszolunk.
                </p>
              )}
              {allapot === "hiba" && (
                <p className="mt-4 rounded-xl bg-booked/10 px-4 py-3 text-center text-sm font-semibold text-booked">
                  Hiba történt a küldés közben. Kérjük, próbáld újra, vagy írj
                  nekünk közvetlenül: {SITE.email}
                </p>
              )}
            </form>
          </Reveal>

          {/* elérhetőségek + térkép */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl bg-navy p-7 text-cream">
                <h3 className="font-display mb-5 text-xl font-bold">
                  Elérhetőségeink
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-wood" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>{SITE.cim}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-wood" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-wood">
                      {SITE.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-wood" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                    </svg>
                    <a href={`tel:${SITE.telefon.replace(/\s/g, "")}`} className="transition-colors hover:text-wood">
                      {SITE.telefon}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex-1 overflow-hidden rounded-3xl border border-sand shadow-lg shadow-navy/5">
                <iframe
                  title="Erkel 19 Apartmanház térképen"
                  src="https://www.google.com/maps?q=Keszthely,+Erkel+Ferenc+utca+19&output=embed"
                  className="h-full min-h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
