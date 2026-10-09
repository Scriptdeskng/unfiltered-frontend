import type { Product, ProductColor } from "./types";

export type FilterOptions = {
  categories: string[];
  colors: ProductColor[];
  sizes: string[];
  priceMax: number;
};

const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export function buildFilterOptions(products: Product[]): FilterOptions {
  const categories = new Set<string>();
  const colors = new Map<string, ProductColor>();
  const sizes = new Set<string>();
  let max = 0;

  for (const p of products) {
    if (p.category) categories.add(p.category);
    p.colors.forEach((c) => colors.set(c.name, c));
    p.sizes.forEach((s) => sizes.add(s));
    if (p.price > max) max = p.price;
  }

  const rank = (s: string) => {
    const i = SIZE_ORDER.indexOf(s.toUpperCase());
    return i === -1 ? SIZE_ORDER.length : i;
  };

  return {
    categories: [...categories].sort((a, b) => a.localeCompare(b)),
    colors: [...colors.values()],
    sizes: [...sizes].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)),
    priceMax: max > 0 ? Math.ceil(max) : 0,
  };
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 890;
export const categories = ["Shirts", "Caps", "Hoodie", "Headband", "Hat", "Jackets"];

// import type { Product } from "./types";



// const COLOR_SETS = {
//   standard: [
//     { name: "Slate Blue", hex: "#7C93C9" },
//     { name: "Sand", hex: "#E0B96D" },
//     { name: "Moss", hex: "#5C8A5C" },
//   ],
//   blueAccent: [
//     { name: "Slate Blue", hex: "#7C93C9" },
//     { name: "Sand", hex: "#E0B96D" },
//     { name: "Moss", hex: "#5C8A5C" },
//     { name: "Cobalt", hex: "#3355CC" },
//   ],
// };

// const SIZES = ["S", "M", "L", "XL", "XXL"];

// export const products: Product[] = [
//   {
//     id: "p1",
//     slug: "classic-monochrome-tees",
//     name: "Classic Monochrome Tees",
//     category: "Shirts",
//     price: 35,
//     images: ["/products/classic.svg", "/products/classic.svg"],
//     colors: COLOR_SETS.blueAccent,
//     sizes: SIZES,
//     description:
//       "A limited-edition piece from the UNFILTERED Chapter One: Beyond the Skin collection. Designed as a physical extension of the exhibition, the tee carries the spirit of the stories, conversations, and ideas explored throughout the chapter.",
//     specs: ["Unisex fit", "100% cotton", "Soft, heavyweight fabric", "Chapter One limited edition"],
//     inStock: true,
//   },
//   {
//     id: "p2",
//     slug: "monochromatic-wardrobe",
//     name: "Monochromatic Wardrobe",
//     category: "Shirts",
//     price: 27,
//     images: ["/products/monochrome.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description:
//       "Part of the UNFILTERED Chapter One collection, built for quiet contrast and everyday wear.",
//     specs: ["Unisex fit", "100% cotton", "Chapter One limited edition"],
//     inStock: true,
//   },
//   {
//     id: "p3",
//     slug: "essential-neutrals",
//     name: "Essential Neutrals",
//     category: "Shirts",
//     price: 22,
//     images: ["/products/essential.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "A pared-back staple from the UNFILTERED collection, made to layer or wear alone.",
//     specs: ["Unisex fit", "100% cotton"],
//     inStock: true,
//   },
//   {
//     id: "p4",
//     slug: "utraanet-black",
//     name: "UTRAANET Black",
//     category: "Shirts",
//     price: 43,
//     images: ["/products/utraanet.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "A graphic tee pulling from the exhibition's visual language.",
//     specs: ["Unisex fit", "100% cotton", "Screen-printed graphic"],
//     inStock: true,
//   },
//   {
//     id: "p5",
//     slug: "elegant-ebony-sweatshirts",
//     name: "Elegant Ebony Sweatshirts",
//     category: "Hoodie",
//     price: 35,
//     images: ["/products/elegant.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "A heavyweight crewneck built for cooler days, cut from the same story as the rest of the chapter.",
//     specs: ["Unisex fit", "80% cotton, 20% polyester", "Brushed interior"],
//     inStock: true,
//   },
//   {
//     id: "p6",
//     slug: "sleek-and-cozy-black",
//     name: "Sleek and Cozy Black",
//     category: "Hoodie",
//     price: 57,
//     images: ["/products/sleek.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "The chapter's signature hoodie — structured, warm, and quietly detailed.",
//     specs: ["Unisex fit", "Soft, heavyweight fabric", "Chapter One limited edition"],
//     inStock: true,
//   },
//   {
//     id: "p7",
//     slug: "raw-black-tees",
//     name: "Raw Black T-Shirt Lineup",
//     category: "Shirts",
//     price: 19,
//     images: ["/products/raw-black.png", "/products/raw-black-2.jpg", "/products/raw-black-3.jpg"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description:
//       "A limited-edition piece from the UNFILTERED Chapter One: Beyond the Skin collection. Designed as a physical extension of the exhibition, the tee carries the spirit of the stories, conversations, and ideas explored throughout the chapter.",
//     specs: ["Unisex fit", "100% cotton", "Soft, heavyweight fabric", "Chapter One limited edition"],
//     inStock: true,
//   },
//   {
//     id: "p8",
//     slug: "mockup-black",
//     name: "MOCKUP Black",
//     category: "Shirts",
//     price: 30,
//     images: ["/products/mockup.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "A minimal essential, made to mock up your own story onto.",
//     specs: ["Unisex fit", "100% cotton"],
//     inStock: true,
//   },
//   {
//     id: "p9",
//     slug: "athletic-shirt",
//     name: "Athletic Shirt",
//     category: "Shirts",
//     price: 35,
//     images: ["/products/athletic.png"],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description: "A lightweight everyday tee with a subtle graphic mark.",
//     specs: ["Unisex fit", "100% cotton"],
//     inStock: true,
//   },
//   {
//     id: "p10",
//     slug: "beyond-the-skin-tee",
//     name: "Beyond the Skin Tee",
//     category: "Shirts",
//     price: 35000,
//     images: [
//       "/products/monochrome.png",
//       "/products/elegant.png",
//       "/products/sleek.png",
//       "/products/raw-black.png",
//     ],
//     colors: COLOR_SETS.standard,
//     sizes: SIZES,
//     description:
//       "A limited-edition piece from the UNFILTERED Chapter One: Beyond the Skin collection. Designed as a physical extension of the exhibition, the tee carries the spirit of the stories, conversations, and ideas explored throughout the chapter.",
//     specs: ["Unisex fit", "100% cotton", "Soft, heavyweight fabric", "Chapter One limited edition"],
//     inStock: true,
//   },
// ];


// export const PRICE_MIN = Math.min(...products.map((p) => p.price));
// export const PRICE_MAX = Math.max(...products.map((p) => p.price));


// export const categories = ["Shirts", "Caps", "Hoodie", "Headband", "Hat", "Jackets"];

// export function getProductBySlug(slug: string): Product | undefined {
//   return products.find((p) => p.slug === slug);
// }

// export function getRelatedProducts(current: Product, count = 4): Product[] {
//   return products.filter((p) => p.id !== current.id).slice(0, count);
// }

// Mock product data has been removed — products now come from lib/api.ts.
// Only static UI constants remain here.



// export const PRICE_MIN = 0;
// export const PRICE_MAX = 890; // matches the default maxPrice in the shop filters

// export const categories = ["Shirts", "Caps", "Hoodie", "Headband", "Hat", "Jackets"];

