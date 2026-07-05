import { createClient } from "next-sanity";
import {
  projectId,
  dataset,
  apiVersion,
  sanityConfigured,
} from "@/sanity/env";

export type FoglaltIdoszak = {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD (utolsó foglalt nap)
};

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Bemutató adatok, amíg a Sanity nincs beállítva. */
function demoAdatok(): FoglaltIdoszak[] {
  const ma = new Date();
  const plusNap = (n: number) => {
    const d = new Date(ma);
    d.setDate(d.getDate() + n);
    return d;
  };
  return [
    { start: toISODate(plusNap(3)), end: toISODate(plusNap(7)) },
    { start: toISODate(plusNap(14)), end: toISODate(plusNap(16)) },
    { start: toISODate(plusNap(25)), end: toISODate(plusNap(32)) },
    { start: toISODate(plusNap(45)), end: toISODate(plusNap(48)) },
  ];
}

/**
 * Foglalt időszakok lekérése a Sanity-ből.
 * Ha a Sanity nincs beállítva, bemutató adatokat ad vissza.
 */
export async function getFoglaltIdoszakok(): Promise<{
  bookings: FoglaltIdoszak[];
  demo: boolean;
}> {
  if (!sanityConfigured) {
    return { bookings: demoAdatok(), demo: true };
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });

  const bookings = await client.fetch<FoglaltIdoszak[]>(
    `*[_type == "foglalas" && defined(kezdet) && defined(veg)]{
      "start": kezdet,
      "end": veg
    } | order(start asc)`
  );

  return { bookings: bookings ?? [], demo: false };
}
