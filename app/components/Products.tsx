"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";

import products from "../../public/data/all-products";
import ProductCard from "./ProductCard";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductsProps = {
    category: string;
};

type SortOption =
    | "relevance"
    | "popularity"
    | "priceLowHigh"
    | "priceHighLow"
    | "discount";

/* Label mapping */
const sortLabelMap: Record<SortOption, string> = {
    relevance: "Relevance",
    popularity: "Popularity",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    discount: "Discount",
};

const Products = ({ category }: ProductsProps) => {
    const [sortBy, setSortBy] = useState<SortOption>("relevance");

    const filteredAndSortedProducts = useMemo(() => {
        const filtered = products.filter(
            (product) => product.categories?.[0] === category
        );

        switch (sortBy) {
            case "popularity":
                return [...filtered].sort(
                    (a, b) =>
                        (b.ratings?.count ?? 0) - (a.ratings?.count ?? 0)
                );
            case "priceLowHigh":
                return [...filtered].sort((a, b) => a.price - b.price);
            case "priceHighLow":
                return [...filtered].sort((a, b) => b.price - a.price);
            case "discount":
                return [...filtered].sort(
                    (a, b) =>
                        (b.discount?.value ?? 0) - (a.discount?.value ?? 0)
                );
            default:
                return filtered;
        }
    }, [category, sortBy]);

    return (
        <section className="relative">
            {/* Header + Sort */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-gray-600">
                    {filteredAndSortedProducts.length} items available
                </p>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-gray-950">Sort by</span>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="
                  flex items-center gap-2
                  rounded-full
                  bg-white/70
                  backdrop-blur-lg
                  border border-gray-300
                  px-5 py-2
                  font-medium
                  text-gray-950
                  shadow-md
                  hover:shadow-lg
                  hover:border-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/40
                  transition
                "
                            >
                                {sortLabelMap[sortBy]}
                                <svg
                                    className="h-4 w-4 text-gray-950"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-950"
                        >
                            {(Object.keys(sortLabelMap) as SortOption[]).map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className="
    flex items-center justify-between
    rounded-md
    px-2 py-1.5
    cursor-pointer

    transition-colors
    duration-300
    ease-in

    hover:bg-gray-950
    hover:text-white
  "
                                >
                                    <span>{sortLabelMap[option]}</span>

                                    {sortBy === option && (
                                        <Check className="h-4 w-4 text-blue-600" />
                                    )}
                                </DropdownMenuItem>

                            ))}
                        </DropdownMenuContent>

                    </DropdownMenu>
                </div>
            </div>

            {/* Product Grid */}
            <div
                className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          gap-4
          md:gap-6
        "
            >
                {filteredAndSortedProducts.map((p) => (
                    <div
                        key={p._id}
                        className="transition-transform hover:-translate-y-1"
                    >
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
                <div className="mt-16 text-center text-gray-500">
                    No products found in this category.
                </div>
            )}
        </section>
    );
};

export default Products;
