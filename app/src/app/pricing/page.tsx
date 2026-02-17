import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PricingCalendar from "@/components/PricingCalendar";
import { getPricingConfig } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Sprawdź ceny wynajmu Villa Monte Calvia w Alghero. Wybierz daty pobytu i zobacz kalkulację kosztów.",
  openGraph: {
    title: "Cennik | Villa Monte Calvia",
    description:
      "Sprawdź ceny wynajmu Villa Monte Calvia w Alghero. Wybierz daty pobytu i zobacz kalkulację kosztów.",
  },
};

export default async function PricingPage() {
  const config = await getPricingConfig();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <Reveal>
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold md:text-4xl">Cennik</h1>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" />
            <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
              Wybierz daty, aby zobaczyć cenę pobytu
            </p>
          </div>
        </Reveal>

        <Reveal>
          {config ? (
            <PricingCalendar config={config} />
          ) : (
            <p className="text-center text-muted">
              Cennik jest aktualnie niedostępny. Skontaktuj się z nami
              bezpośrednio.
            </p>
          )}
        </Reveal>
      </section>
    </main>
  );
}
