"use client";

import { Heart, Star, Truck, RefreshCcw } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  mrp?: number;
  discount?: {
    type: string;
    value: number;
  };
  attributes?: {
    brand?: string;
    ram?: string;
    storage?: string;
    color?: string;
  };
  ratings?: {
    average: number;
    count: number;
  };
  seller?: {
    name: string;
  };
  stock?: number;
  isReturnable?: boolean;
  shipping?: {
    freeShipping?: boolean;
    estimatedDeliveryDays?: number;
  };
  image?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const discountPercent =
    product.discount?.type === "percentage"
      ? product.discount.value
      : undefined;

  return (
    <div
      className="
        relative h-[420px] w-full
        rounded-2xl
        bg-white/30 dark:bg-zinc-900/60
        backdrop-blur-xl
        border border-white/20 dark:border-zinc-800/60
        shadow-lg
        transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1
        flex flex-col
      "
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-white/10 dark:from-white/10 pointer-events-none" />

      <div className="relative p-4 flex flex-col h-full">
        {/* Wishlist */}
        <button className="absolute top-3 right-3 rounded-full bg-white/60 dark:bg-zinc-800/70 backdrop-blur-md p-1.5 shadow">
          <Heart
            size={16}
            className="text-gray-600 dark:text-zinc-300 hover:text-red-500"
          />
        </button>

        {/* Image */}
        <div className="flex justify-center items-center h-[180px] mb-3">
          <img
            src={product.image || "/placeholder-phone.png"}
            alt={product.name}
            className="max-h-[160px] object-contain transition-transform hover:scale-105"
          />
        </div>

        {/* Discount Badge */}
        {discountPercent && (
          <span className="self-start text-xs bg-red-500/90 text-white px-2 py-1 rounded-full mb-2">
            {discountPercent}% OFF
          </span>
        )}

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Variant Info */}
        <p className="text-xs text-gray-700 dark:text-zinc-400 mb-2 min-h-[16px]">
          {[product.attributes?.ram, product.attributes?.storage, product.attributes?.color]
            .filter(Boolean)
            .join(" | ")}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{product.price.toLocaleString()}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-gray-500 dark:text-zinc-500 line-through">
              ₹{product.mrp.toLocaleString()}
            </span>
          )}
        </div>

        {/* Ratings */}
        {product.ratings && (
          <div className="flex items-center gap-1 text-sm mb-2">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-800 dark:text-zinc-200">
              {product.ratings.average}
            </span>
            <span className="text-gray-600 dark:text-zinc-400">
              ({product.ratings.count.toLocaleString()})
            </span>
          </div>
        )}

        <div className="flex-grow" />

        {/* Benefits */}
        <ul className="text-xs text-emerald-700 dark:text-emerald-400 space-y-1">
          {product.shipping?.freeShipping && (
            <li className="flex items-center gap-1">
              <Truck size={12} />
              Free Delivery
            </li>
          )}
          {product.isReturnable && (
            <li className="flex items-center gap-1">
              <RefreshCcw size={12} /> Returnable
            </li>
          )}
        </ul>

        {/* Stock Warning */}
        {product.stock !== undefined && product.stock < 10 && (
          <p className="text-xs text-red-500 mt-2 font-medium">
            Only {product.stock} left
          </p>
        )}
      </div>
    </div>
  );
}
