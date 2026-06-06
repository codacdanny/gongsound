/** Consistent eyebrow + index marker used to open each section. */
export default function SectionHeading({
  index,
  kicker,
  className = "",
}: {
  index: string;
  kicker: string;
  className?: string;
}) {
  return (
    <div className={`reveal flex items-center gap-4 ${className}`}>
      <span className="font-mono text-xs text-gold-deep">{index}</span>
      <span className="h-px w-8 bg-gold/50" />
      <span className="label text-gold">{kicker}</span>
    </div>
  );
}
