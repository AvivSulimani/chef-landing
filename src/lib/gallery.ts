// Types and categories for the photo and video gallery. The items themselves are generated into
// gallery-items.ts from the owner's photo library.

export type GalleryCategory = "tasting" | "sharing" | "events" | "process";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "tasting", label: "ארוחות טעימות" },
  { id: "sharing", label: "ארוחות שארינג" },
  { id: "events", label: "אירועים" },
  { id: "process", label: "תהליך העבודה" },
];

type GalleryBase = {
  id: string;
  category: GalleryCategory;
  /** File under /public. */
  src: string;
  width: number;
  height: number;
  /** Average colour, shown behind the picture while it loads. */
  color: string;
  /** What the picture shows, for screen readers. */
  alt: string;
};

export type GalleryPhoto = GalleryBase & { kind: "photo" };
export type GalleryVideo = GalleryBase & { kind: "video"; poster: string };
export type GalleryItem = GalleryPhoto | GalleryVideo;
