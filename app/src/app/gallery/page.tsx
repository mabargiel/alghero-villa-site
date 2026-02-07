import {getGallery} from "@/lib/sanity/queries";
import GalleryClient from "./GalleryClient";

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
        <GalleryClient images={images} />
      )}
    </main>
  );
}
