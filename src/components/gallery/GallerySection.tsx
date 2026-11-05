import { galleryItems } from "@/lib/gallery-items";
import { eyebrow } from "../styles";
import { GalleryExplorer } from "./GalleryExplorer";

/** Pictures and clips from the kitchen and from the tables, by kind of meal. */
export function GallerySection() {
  return (
    <section id="gallery" className="px-6 pb-16 md:px-14 md:pb-[124px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:gap-[52px]">
        <div className="flex flex-col items-center gap-2.5 md:gap-3.5">
          <span className={eyebrow}>גלריה</span>
          <h2 className="text-center font-serif text-2xl md:text-[32px]">רגעים מהמטבח</h2>
        </div>
        <GalleryExplorer items={galleryItems} />
      </div>
    </section>
  );
}
