type SubpageHeaderProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
}>;

export default function SubpageHeader({
  eyebrow,
  title,
  description,
}: SubpageHeaderProps) {
  return (
    <div className="bg-[var(--deep-olive)] pt-36 pb-12 md:pt-40 md:pb-14">
      <header className="mx-auto max-w-6xl px-6">
        {eyebrow && (
          <p className="text-sm tracking-[0.2em] text-[var(--accent-warm)] uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-4xl font-semibold text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-3 h-0.5 w-12 rounded-full bg-[var(--accent-warm)]" />
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {description}
          </p>
        )}
      </header>
    </div>
  );
}
