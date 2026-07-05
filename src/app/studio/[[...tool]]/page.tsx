"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <div className="max-w-xl rounded-3xl border border-sand bg-white p-10 shadow-lg">
          <h1 className="font-display mb-4 text-2xl font-bold text-navy">
            Az adminfelület még nincs beállítva
          </h1>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink/75">
            <li>
              Hozz létre egy ingyenes fiókot és projektet a{" "}
              <a href="https://www.sanity.io" target="_blank" rel="noreferrer" className="font-semibold text-teal underline">
                sanity.io
              </a>{" "}
              oldalon.
            </li>
            <li>
              Másold a projekt azonosítóját (Project ID) a projekt gyökerében
              lévő <code className="rounded bg-sand px-1.5 py-0.5">.env.local</code>{" "}
              fájlba:{" "}
              <code className="rounded bg-sand px-1.5 py-0.5">
                NEXT_PUBLIC_SANITY_PROJECT_ID=...
              </code>
            </li>
            <li>
              A Sanity felületén (sanity.io/manage → API → CORS origins) add
              hozzá a weboldal címét (fejlesztéshez:{" "}
              <code className="rounded bg-sand px-1.5 py-0.5">http://localhost:3000</code>
              ).
            </li>
            <li>Indítsd újra az oldalt – és itt megjelenik az adminfelület.</li>
          </ol>
          <p className="mt-6 text-xs text-ink/50">
            Részletes útmutató a projekt <strong>README.md</strong> fájljában.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
