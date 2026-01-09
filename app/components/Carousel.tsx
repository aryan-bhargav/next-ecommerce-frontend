"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Mattress",
    price: "From ₹2,999",
    subtitle: "Wakefit, Sleepwell & more",
    image: "./images/1.png",
    gradient: ["#3b82f6", "#1e40af"], // blue
  },
  {
    title: "Sofas",
    price: "From ₹5,999",
    subtitle: "Modern & Comfort Living",
    image: "./images/2.png",
    gradient: ["#6366f1", "#4338ca"], // indigo
  },
  {
    title: "Refrigerators",
    price: "From ₹9,999",
    subtitle: "LG, Samsung & more",
    image: "./images/3.png",
    gradient: ["#06b6d4", "#0e7490"], // cyan
  },
  {
    title: "Washing Machines",
    price: "From ₹12,499",
    subtitle: "Top & Front Load",
    image: "./images/4.png",
    gradient: ["#0ea5e9", "#075985"], // sky
  },
  {
    title: "Smart TVs",
    price: "From ₹14,999",
    subtitle: "Sony, MI, Samsung",
    image: "./images/5.png",
    gradient: ["#2563eb", "#1e3a8a"], // deep blue
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + slides.length) % slides.length);
  const next = () =>
    setIndex((index + 1) % slides.length);

  return (
    <div className="w-full flex justify-center mt-8">
      <div
        className="w-full max-w-7xl h-[280px] rounded-2xl overflow-hidden relative transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, ${slides[index].gradient[0]}, ${slides[index].gradient[1]})`,
        }}
      >
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40" />

        {/* Content */}
        <div className="relative h-full flex items-center px-16">

          {/* Image Card */}
          <div className="
            w-48 h-48 rounded-2xl
            bg-white/40 backdrop-blur-xl
            border border-white/40
            shadow-lg
            flex items-center justify-center
          ">
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="h-40 object-contain rounded-xl"
            />
          </div>

          {/* Text */}
          <div className="ml-12 text-white">
            <h2 className="text-xl font-semibold">
              {slides[index].title}
            </h2>
            <h1 className="text-3xl font-bold mt-1">
              {slides[index].price}
            </h1>
            <p className="text-white/90 mt-2">
              {slides[index].subtitle}
            </p>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full bg-white/80 backdrop-blur
            flex items-center justify-center shadow"
        >
          <ChevronLeft className="text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full bg-white/80 backdrop-blur
            flex items-center justify-center shadow"
        >
          <ChevronRight className="text-black" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-black" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
