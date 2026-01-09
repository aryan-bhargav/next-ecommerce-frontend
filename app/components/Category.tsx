"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryItem {
  title: string;
  image?: string;
  path: string[];
}

const DEFAULT_IMAGE = "/images/default-category.png";

const categories: CategoryItem[] = [
  {
    title: "Electronics",
    image: "/images/electronics.png",
    path: ["electronics"],
  },
  {
    title: "Mobiles",
    image: "/images/mobiles.png",
    path: ["electronics", "mobiles"],
  },
  {
    title: "Men",
    image: "/images/men-fashion.png",
    path: ["fashion", "men"],
  },
  {
    title: "Women",
    image: "/images/women-fashion.png",
    path: ["fashion", "women"],
  },
  {
    title: "Home",
    image: "/images/home.png",
    path: ["home"],
  },
];

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Category: React.FC = () => {
  const router = useRouter();

  const handleClick = (title: string) => {
    const slug = toSlug(title);
    router.push(`/c/${slug}`);
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
              bg-white/30 dark:bg-zinc-900/50
              backdrop-blur-lg
              border border-white/30 dark:border-zinc-800/60
              shadow-sm
              flex flex-col items-center justify-center
              cursor-pointer
              hover:bg-white/40 dark:hover:bg-zinc-800/60
              transition
              focus:outline-none
            "
          >
            <Image
              src={cat.image || DEFAULT_IMAGE}
              alt={cat.title}
              width={28}
              height={28}
              className="object-contain mb-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
              }}
            />

            <div className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100 text-center">
              {cat.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
