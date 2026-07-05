import { defineField, defineType } from "sanity";

/**
 * Foglalt időszak – a tulajdonos ezekkel a dokumentumokkal jelöli,
 * mely napok foglaltak. A weboldal naptára ezt jeleníti meg.
 */
export const foglalas = defineType({
  name: "foglalas",
  title: "Foglalt időszak",
  type: "document",
  fields: [
    defineField({
      name: "megnevezes",
      title: "Megnevezés (csak neked, a vendégek nem látják)",
      description: "Pl. „Kovács család” vagy „Booking foglalás”",
      type: "string",
    }),
    defineField({
      name: "kezdet",
      title: "Első foglalt éjszaka (érkezés napja)",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required().error("Add meg a kezdő dátumot!"),
    }),
    defineField({
      name: "veg",
      title: "Utolsó foglalt éjszaka (a távozás előtti nap)",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) =>
        rule
          .required()
          .error("Add meg a záró dátumot!")
          .min(rule.valueOfField("kezdet"))
          .error("A záró dátum nem lehet korábbi a kezdő dátumnál!"),
    }),
  ],
  preview: {
    select: { megnevezes: "megnevezes", kezdet: "kezdet", veg: "veg" },
    prepare({ megnevezes, kezdet, veg }) {
      return {
        title: megnevezes || "Foglalt időszak",
        subtitle: kezdet && veg ? `${kezdet} → ${veg}` : "Hiányzó dátum",
      };
    },
  },
});
