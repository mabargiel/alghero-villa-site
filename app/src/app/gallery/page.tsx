import {getGallery} from "@/lib/sanity/queries";

export default async function GalleryPage() {
  const gallery = await getGallery();
  const images = gallery?.images ?? [];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
          Galeria
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Villa Monte Calvia
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Wybór zdjęć przedstawiających ogród, wnętrza oraz otoczenie willi.
        </p>
      </header>

      {images.length === 0 ? (
        <div className="rounded-3xl border border-[var(--surface)] bg-[var(--surface)] p-10 text-center text-[var(--muted)]">
          Dodaj zdjęcia w Sanity Studio, aby pojawiły się w galerii.
        </div>
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((image) => {
            const aspectRatio =
              image.image.asset.metadata?.dimensions?.aspectRatio;
            return (
              <figure
                key={image._key}
                className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[var(--surface)] bg-white/70"
              >
                <div
                  className="w-full bg-[var(--surface)]"
                  style={aspectRatio ? {aspectRatio} : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.image.asset.url}
                    alt={image.altText}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                {(image.title || image.caption) && (
                  <figcaption className="px-4 py-3 text-sm text-[var(--muted)]">
                    {image.title || image.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}
    </main>
  );
}
