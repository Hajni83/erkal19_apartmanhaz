"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "erkel19",
  title: "Erkel 19 Apartmanház – Adminisztráció",
  basePath: "/studio",
  // Amíg nincs beállítva a projekt, egy placeholder azonosítót használunk,
  // hogy az oldal build-je ne törjön el.
  projectId: projectId || "placeholder",
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Tartalom")
          .items([
            S.listItem()
              .title("Foglalt időszakok")
              .child(
                S.documentTypeList("foglalas")
                  .title("Foglalt időszakok")
                  .defaultOrdering([{ field: "kezdet", direction: "asc" }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
