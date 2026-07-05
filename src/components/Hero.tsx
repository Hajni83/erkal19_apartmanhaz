"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { SITE } from "@/lib/config";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="fooldal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy"
    >
      {/* háttér: kép, ha van, alatta színátmenet */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18,35,58,0.72), rgba(18,35,58,0.82)), url('/images/nappali.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/60 via-transparent to-teal-dark/40" />

      {/* lebegő dekor körök */}
      <motion.div
        aria-hidden
        className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-wood/10 blur-3xl"
        animate={{ y: [0, -35, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center"
      >
        <motion.div variants={item} className="mb-7 flex justify-center">
          <LogoMark className="h-20 w-20 text-sand" />
        </motion.div>

        <motion.p
          variants={item}
          className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-sand-dark"
        >
          Keszthely · Balaton
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-bold leading-tight text-cream md:text-7xl"
        >
          Erkel 19
          <span className="mt-2 block text-2xl font-medium tracking-[0.18em] text-sand md:text-3xl">
            Apartmanház
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sand/90"
        >
          Letisztult, otthonos apartmanok csendes környezetben – néhány percre a
          Balatontól és a Festetics-kastélytól.
        </motion.p>

        {/* Booking értékelés */}
        <motion.div
          variants={item}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-sand/25 bg-cream/10 px-5 py-2.5 backdrop-blur-sm"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg rounded-br-none bg-[#003b95] font-bold text-white">
            {SITE.bookingErtekeles}
          </span>
          <span className="text-left text-sm leading-tight text-cream">
            <strong className="block">{SITE.bookingSzoveg}</strong>
            <span className="text-sand/80">Booking.com értékelés</span>
          </span>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#szobak"
            className="rounded-full bg-teal px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-xl"
          >
            Szobáink
          </a>
          <a
            href="#naptar"
            className="rounded-full border border-sand/40 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:border-sand hover:bg-cream/10"
          >
            Szabad időpontok
          </a>
        </motion.div>
      </motion.div>

      {/* lefelé görgetés jelző */}
      <motion.a
        href="#rolunk"
        aria-label="Görgess lejjebb"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-sand/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
