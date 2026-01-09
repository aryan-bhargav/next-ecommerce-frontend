"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryItem {
  title: string;
  image?: string;
}

const DEFAULT_IMAGE = "/images/default-category.png";

const categories: CategoryItem[] = [
  { title: "Groceries", image: "/images/groceries.png" },
  { title: "Fashion", image: "/images/fashion.png" },
  { title: "Electronics", image: "/images/electronics.png" },
  { title: "Home & Lifestyle", image: "/images/home_&_lifestyle.png" },
  {
    title: "Industrial & Professional Supplies",
    image: "/images/Industrial_&_Professional_Supplies.png",
  },
  { title: "Furniture", image: "/images/furniture.png" },
  {
    title: "School, Office & Stationery",
    image: "/images/school-office.png",
  },
];

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Category: React.FC = () => {
  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(`/c/${toSlug(title)}`);
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
              width={70}
              height={70}
              className="object-contain mb-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
