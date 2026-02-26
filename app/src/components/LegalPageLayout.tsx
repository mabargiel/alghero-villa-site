import SubpageHeader from "@/components/SubpageHeader";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageLayoutProps = Readonly<{
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}>;

export default function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen pb-16">
      <SubpageHeader
        eyebrow={eyebrow}
        title={title}
        description={lastUpdated}
      />
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed whitespace-pre-line text-[var(--muted)]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
