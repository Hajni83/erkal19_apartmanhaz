import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Erkel 19 Apartmanház · Keszthely",
  description:
    "Erkel 19 Apartmanház – letisztult, otthonos apartmanok Keszthelyen, a Balaton közelében. Booking.com értékelés: 10 – Kivételes.",
  keywords: [
    "Keszthely apartman",
    "Balaton szállás",
    "Erkel 19 Apartmanház",
    "apartman Keszthely",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
