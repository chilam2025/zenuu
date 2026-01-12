export type Product = {
  id: string;
  name: string;
  priceTZS: number;
  category: "TV" | "Kitchen" | "Home";
  image: string; // local path in /public
  desc: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "tv-1",
    name: 'Smart TV 43" (4K)',
    priceTZS: 650000,
    category: "TV",
    image: "/products/tv.jpg",
    desc: "HDMI/USB, Smart apps. Perfect for home entertainment.",
  },
  {
    id: "blend-1",
    name: "Blender (Multi-set)",
    priceTZS: 85000,
    category: "Kitchen",
    image: "/products/blender.jpg",
    desc: "Smoothies, grinding, and juice. Easy to clean.",
  },
  {
    id: "cook-1",
    name: "Electric Cooker",
    priceTZS: 120000,
    category: "Kitchen",
    image: "/products/cooker.jpg",
    desc: "Fast cooking with safe temperature control.",
  },
  {
    id: "iron-1",
    name: "Steam Iron",
    priceTZS: 45000,
    category: "Home",
    image: "/products/iron.jpg",
    desc: "Steam + dry ironing. Clean finish for clothes.",
  },
];
