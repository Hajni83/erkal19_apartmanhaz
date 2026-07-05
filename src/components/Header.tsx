"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { NAV_ITEMS } from "@/lib/config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 shadow-lg shadow-navy/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#fooldal" aria-label="Erkel 19 Apartmanház – főoldal">
          <Logo variant={scrolled ? "dark" : "light"} />
        </a>

        {/* asztali menü */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-teal ${
                scrolled ? "text-navy" : "text-cream"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* mobil menü gomb */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
            scrolled ? "text-navy" : "text-cream"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-cream/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-teal-light hover:text-teal"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
