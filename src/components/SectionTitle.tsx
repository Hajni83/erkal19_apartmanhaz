import Reveal from "./Reveal";

type SectionTitleProps = {
  kicker: string;
  title: string;
  lead?: string;
  light?: boolean;
};

export default function SectionTitle({
  kicker,
  title,
  lead,
  light = false,
}: SectionTitleProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-[0.3em] ${
          light ? "text-sand-dark" : "text-teal"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`font-display text-3xl font-bold md:text-4xl ${
          light ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mx-auto mt-5 h-0.5 w-16 ${
          light ? "bg-wood" : "bg-teal"
        }`}
      />
      {lead && (
        <p
          className={`mt-5 leading-relaxed ${
            light ? "text-sand" : "text-ink/70"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
