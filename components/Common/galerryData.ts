import type { GalleryRow } from "./GalleryGrid";

export const ALL_ROWS: GalleryRow[] = [
  {
    cols: 2,
    items: [
      { src: "/assets/whatImg.svg", alt: "Portrait with hand resting on shoulder" },
      { src: "/assets/spotted-heard.svg", alt: "Portrait against a pale grey backdrop" },
    ],
  },
  {
    cols: 3,
    items: [
      { src: "/assets/bepart.jpg", alt: "Three subjects together in white" },
      { src: "/assets/img1.jpg", alt: "Two subjects against a brick wall" },
      { src: "/assets/img2.jpg", alt: "Visitors in the exhibition space" },
    ],
  },
  {
    cols: 2,
    items: [
      { src: "/assets/Vitiligo-lady.svg", alt: "Portrait with eyes closed, pink backdrop" },
      { src: "/assets/grid3.jpg", alt: "Portrait against green foliage" },
    ],
  },
  {
    cols: 3,
    items: [
      { src: "/assets/accepted.svg", alt: "Motion-blurred red abstract" },
      { src: "/assets/arm.jpg", alt: "Close detail of skin texture" },
      { src: "/assets/portrait.jpg", alt: "Portrait in low warm light" },
    ],
  },
];

// Placeholder — reuse the same set until the other tabs' images are ready
export const TAB_ROWS: Record<string, GalleryRow[]> = {
  all: ALL_ROWS,
  exhibition: ALL_ROWS,
  portraits: ALL_ROWS,
  bts: ALL_ROWS,
  events: ALL_ROWS,
};