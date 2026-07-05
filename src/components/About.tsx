import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const SZOLGALTATASOK = [
  {
    icon: (
      <>
        <path d="M3 13h13a3 3 0 0 1 3 3v1H3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 9c1 0 1.5-.7 1.5-1.5S21 6 20 6M4 4l16 16" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    cim: "Nemdohányzó szobák",
    szoveg: "Minden szállásegységünk nemdohányzó, friss és tiszta.",
  },
  {
    icon: (
      <path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M11 18.5a2 2 0 0 1 2 0M12 20h.01" strokeWidth="1.8" strokeLinecap="round" />
    ),
    cim: "Ingyenes wifi",
    szoveg: "Gyors, korlátlan internet az egész házban és a kertben is.",
  },
  {
    icon: (
      <>
        <rect x="3" y="10" width="18" height="8" rx="2" strokeWidth="1.6" />
        <path d="M6 10l2-4h8l2 4M7 18v2M17 18v2" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    cim: "Ingyenes parkolás",
    szoveg: "Díjmentes parkolási lehetőség a vendégeink részére.",
  },
];

export default function About() {
  return (
    <section id="rolunk" className="bg-cream px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="Rólunk"
          title="Otthon, a Balaton partjától pár percre"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 leading-relaxed text-ink/80">
              <p>
                Az Erkel 19 Apartmanház kertre néző szállást kínál terasszal,
                mintegy 1,4 km-re a Libas strandtól. A szálláshelyen erkély,
                asztalitenisz, ingyenes parkolás és ingyenes wifi áll
                rendelkezésre. A vendégek külön bejáraton keresztül juthatnak
                be az apartmanba.
              </p>
              <p>
                Az apartmankomplexum légkondicionált szállásegységei
                szekrénnyel, kávéfőzővel, mosogatógéppel, sütővel, széffel,
                síkképernyős TV-vel, terasszal és kádas, saját fürdőszobával
                rendelkeznek. Étkezősarok és teljesen felszerelt konyha is
                rendelkezésre áll mikrohullámú sütővel, kenyérpirítóval és
                hűtőszekrénnyel. Az apartmankomplexumban minden egységben
                ágynemű és törölköző biztosított.
              </p>
              <p>
                Az apartman vendégei kerékpározhatnak a közelben, vagy a
                kertben pihenhetnek.
              </p>
              <p>
                A Hévízi-tó 7,5 km-re, a sümegi vár pedig 29 km-re található
                az Erkel 19 Apartmanház épületétől. A Hévíz-Balaton repülőtér
                17 km-re található.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal y={20}>
              <h3 className="mb-5 text-center font-display text-xl font-bold text-navy lg:text-left">
                A legnépszerűbb szolgáltatások
              </h3>
            </Reveal>
            <div className="grid gap-4">
              {SZOLGALTATASOK.map((sz, i) => (
                <Reveal key={sz.cim} delay={i * 0.1} y={20}>
                  <div className="group flex items-center gap-5 rounded-2xl border border-sand bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/10">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor">
                        {sz.icon}
                      </svg>
                    </span>
                    <div>
                      <h4 className="mb-0.5 font-bold text-navy">{sz.cim}</h4>
                      <p className="text-sm leading-relaxed text-ink/65">
                        {sz.szoveg}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
