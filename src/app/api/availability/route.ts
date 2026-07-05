import { NextResponse } from "next/server";
import { getFoglaltIdoszakok } from "@/lib/availability";

// A válasz 60 másodpercig gyorsítótárazódik, utána frissül a Sanity-ből.
export const revalidate = 60;

export async function GET() {
  try {
    const data = await getFoglaltIdoszakok();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(
      { bookings: [], demo: false, error: "Nem sikerült betölteni a naptárat." },
      { status: 500 }
    );
  }
}
