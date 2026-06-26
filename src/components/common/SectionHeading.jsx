// Reusable section header: mono eyebrow + display title + the caliper
// signature rule. Pure presentation.
export function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  const centered = align === 'center';
  return (
    <header className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight font-semibold text-primary md:text-4xl">
        {title}
      </h2>
      <div className={`caliper mt-4 ${centered ? 'mx-auto w-40' : 'w-40'}`} />
      {intro && <p className="mt-5 text-muted">{intro}</p>}
    </header>
  );
}
