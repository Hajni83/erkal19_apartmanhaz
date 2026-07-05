# Erkel 19 Apartmanház – weboldal

Letisztult, animált landing page Next.js-ben az Erkel 19 Apartmanház
(8360 Keszthely, Erkel Ferenc utca 19.) részére, kézzel szerkeszthető
foglaltsági naptárral.

## Mit tartalmaz?

- **Főoldal** (`/`): Hero, Rólunk, Szobák (ajánlatkártyák árakkal),
  Látnivalók, Foglaltsági naptár, Kapcsolat űrlap, lábléc – finom
  scroll-animációkkal (framer-motion).
- **Adminfelület** (`/studio`): beágyazott Sanity Studio, ahol a tulajdonos
  kezeli a foglalt időszakokat. Amit itt felvisz, azt látják a vendégek a
  weboldal naptárában (legfeljebb ~1 perc késleltetéssel).
- **Kapcsolat űrlap**: a [FormSubmit.co](https://formsubmit.co) ingyenes
  szolgáltatásán keresztül e-mailben érkeznek az üzenetek.

## Technológia

| Elem | Megoldás |
|---|---|
| Keretrendszer | Next.js (App Router, TypeScript) |
| Stílus | Tailwind CSS v4 |
| Animációk | framer-motion |
| Tartalomkezelés (naptár) | Sanity.io – **ingyenes** csomag |
| Űrlap | FormSubmit.co – **ingyenes** |

## Első indítás (fejlesztés)

```bash
npm install
npm run dev
```

Az oldal a http://localhost:3000 címen nyílik meg. Amíg a Sanity nincs
beállítva, a naptár **bemutató adatokat** mutat (ezt jelzi is az oldalon).

## A foglaltsági naptár beállítása (Sanity – egyszeri teendő)

1. Regisztrálj ingyenesen a [sanity.io](https://www.sanity.io/) oldalon
   (Google fiókkal is lehet).
2. A [sanity.io/manage](https://sanity.io/manage) felületen hozz létre egy új
   projektet (pl. „Erkel 19”), dataset: `production`.
3. Másold ki a **Project ID**-t, majd a projekt gyökerében hozd létre a
   `.env.local` fájlt a `.env.local.example` alapján:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ide_a_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. A sanity.io/manage → projekt → **API → CORS origins** alatt add hozzá:
   - `http://localhost:3000` (fejlesztéshez)
   - a végleges webcímet (pl. `https://erkel19.hu`), *Allow credentials* pipával.
5. Indítsd újra a `npm run dev`-et.

## Hogyan kezeli a tulajdonos a naptárat?

1. Nyisd meg a **`/studio`** oldalt (pl. `https://weboldalad.hu/studio`),
   és jelentkezz be a Sanity fiókkal.
2. A „Foglalt időszakok” listában kattints az **új dokumentum** (ceruza/plusz)
   gombra.
3. Add meg az első és az utolsó foglalt éjszakát (és tetszőleges megnevezést –
   ezt a vendégek nem látják), majd kattints a **Publish** gombra.
4. A weboldal naptárában ezek a napok kb. 1 percen belül pirossal, áthúzva
   („Foglalt”) jelennek meg. Egy időszak törléséhez a dokumentumot kell
   törölni (⋮ menü → Delete → Publish).

## Kapcsolat űrlap aktiválása

Az űrlap a `src/lib/config.ts` fájlban megadott e-mail címre küld
(FormSubmit.co). **Az első beküldött üzenet után** a FormSubmit egy megerősítő
e-mailt küld erre a címre – ezt egyszer jóvá kell hagyni, utána minden üzenet
automatikusan megérkezik. Cím módosítása: `src/lib/config.ts` → `email`.

## Fotók

A fotók a `public/images/` mappában vannak. Kiemelt helyen szerepel:

- `nappali.jpg` – nyitó (hero) háttérkép
- `szoba.jpg` – „Apartman 3 hálószobával” kártya
- `haloszoba.jpg` – „2 hálószobás apartman” kártya

A galéria képlistája a `src/components/Gallery.tsx` fájl `KEPEK` tömbjében
bővíthető. Új fájlnévnél kerüld az ékezetet és a szóközt!

## Szövegek, árak módosítása

- Elérhetőségek, telefonszám: `src/lib/config.ts`
- Szobák és árak: `src/components/Rooms.tsx`
- Rólunk: `src/components/About.tsx`
- Látnivalók: `src/components/Attractions.tsx`

## Közzététel (ingyenes)

A legegyszerűbb a [Vercel](https://vercel.com) (a Next.js készítői, ingyenes
hobbi csomag):

1. Töltsd fel a projektet GitHub-ra.
2. Vercel → New Project → importáld a repót.
3. Environment Variables alatt add meg a `NEXT_PUBLIC_SANITY_PROJECT_ID` és
   `NEXT_PUBLIC_SANITY_DATASET` értékeket.
4. Deploy után a Sanity CORS beállításához add hozzá a kapott webcímet is
   (lásd fent, 4. pont).
