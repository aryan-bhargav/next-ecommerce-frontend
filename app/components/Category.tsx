"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CategoryItem {
  title: string;
  image: string;
  path: string[];
}

const categories: CategoryItem[] = [
  {
    title: "Electronics",
    image: "./images/electronics.png",
    path: ["electronics"],
  },
  {
    title: "Mobiles",
    image: "./images/mobiles.png",
    path: ["electronics", "mobiles"],
  },
  {
    title: "Men",
    image: "./images/men-fashion.png",
    path: ["fashion", "men"],
  },
  {
    title: "Women",
    image: "./images/women-fashion.png",
    path: ["fashion", "women"],
  },
  {
    title: "Home",
    image: "./images/home.png",
    path: ["home"],
  },
];


const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Category: React.FC = () => {
  const router = useRouter();

  const handleClick = (title: string) => {
    const slug = toSlug(title);
    router.push(`/c/${slug}`); // ✅ CORRECT
  };

  return (
    <div className="w-full flex justify-center mt-2 px-2">
      <div className="flex gap-2 max-w-7xl w-full justify-start flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleClick(cat.title)}
            className="
              w-24 h-20
              rounded-xl
              bg-white/20
              backdrop-blur-lg
              border border-white/30
              shadow-sm
              flex flex-col items-center justify-center
              cursor-pointer
              hover:bg-white/30
              transition
              focus:outline-none
            "
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-7 object-contain mb-1"
            />
            <div className="text-[11px] font-medium text-gray-900 text-center">
              {cat.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
