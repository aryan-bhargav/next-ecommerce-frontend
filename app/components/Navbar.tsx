"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  Crosshair,
} from "lucide-react";

const CACHE_KEY = "delivery_location_v4";
const CACHE_TIME = 24 * 60 * 60 * 1000;

export default function Navbar() {
  const [location, setLocation] = useState("Detecting location...");
  const [showInput, setShowInput] = useState(false);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------- AUTO FOCUS ---------- */
  useEffect(() => {
    if (showInput) inputRef.current?.focus();
  }, [showInput]);

  /* ---------- LOAD CACHE / AUTO ---------- */
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { value, time } = JSON.parse(cached);
      if (Date.now() - time < CACHE_TIME) {
        setLocation(value);
        return;
      }
    }
    detectViaGPS();
  }, []);

  /* ---------- GPS → PINCODE ---------- */
  function detectViaGPS() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();
          const pin = data.address?.postcode;
          if (pin) resolveFromPincode(pin);
        } catch { }
      },
      () => { },
      { enableHighAccuracy: true }
    );
  }

  /* ---------- PINCODE → CITY ---------- */
  async function resolveFromPincode(pin: string) {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      const po = data?.[0]?.PostOffice?.[0];

      if (!po) {
        setError("Invalid pincode");
        return;
      }

      const finalValue = `${po.District} - ${pin}`;

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ value: finalValue, time: Date.now() })
      );

      setLocation(finalValue);
      setShowInput(false);
      setPincode("");
      setError("");
    } catch {
      setError("Unable to verify pincode");
    }
  }

  function handleSubmit() {
    if (pincode.length !== 6) return;
    resolveFromPincode(pincode);
  }

  return (
    <header className="w-full">

      {/* ================= FIRST BAR — UNTOUCHED ================= */}
      <div className="sticky top-0 z-50
        bg-[#0c5f84]/40 backdrop-blur-2xl
        border-b border-white/20
        shadow-[0_8px_32px_rgba(31,38,135,0.37)]
        text-white
      ">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">

          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="px-2 py-1 rounded">
              <img width="100" src="/Logo.png" alt="" />
            </span>
          </Link>

          <div className="hidden md:flex justify-between rounded-full
            bg-white/20 backdrop-blur-xl
            border border-white/30
            ring-1 ring-white/50
            shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            relative overflow-hidden
          ">
            <span className="pointer-events-none absolute inset-0 rounded-full
              bg-gradient-to-br from-white/50 via-white/10 to-transparent
              opacity-60
            " />

            <button className="relative bg-white/80 px-12 py-1 m-2
              font-black rounded-2xl text-black shadow">
              Quick
            </button>

            <button className="relative px-12 py-1 m-2
              font-black rounded-2xl text-white/90">
              Scheduled
            </button>
          </div>

          <div className="flex flex-1 items-center rounded-full px-4 py-2
            bg-white/20 backdrop-blur-xl
            border border-white/30
            shadow-inner
          ">
            <Search size={18} className="text-white/80" />
            <input
              type="search"
              placeholder="Search in Quick"
              className="bg-transparent ml-2 w-full outline-none
              placeholder:text-white/70 text-white"
            />
          </div>

          <div className="flex items-center gap-6">
            <Menu />
            <ShoppingCart />
            <Link href="/login" className="flex items-center gap-1">
              <User />
              <span className="hidden md:block">Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SECOND BAR ================= */}
      <div className="bg-[#083f57]/40 backdrop-blur-xl text-white">
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-2 text-sm">

          <span className="bg-white/80 text-[#0c5f84] px-3 py-1 rounded-full font-semibold">
            Delivery in 10 to 30 mins
          </span>

          <span>
            Quick Delivery to: <strong>{location}</strong>
          </span>

          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-1 underline ml-2"
            >
              <MapPin size={14} />
              Change
            </button>
          ) : (
            <div className="flex items-center gap-2
  bg-white/20 backdrop-blur-xl
  border border-white/30
  rounded-full px-3 py-1">


              <input
                ref={inputRef}
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                maxLength={6}
                placeholder="Enter pincode"
                className="bg-transparent outline-none text-white
                placeholder:text-white/70 w-32 text-sm"
              />

              <button
                onClick={handleSubmit}
                disabled={pincode.length !== 6}
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${pincode.length === 6
                    ? "bg-white/80 text-[#0c5f84]"
                    : "bg-white/30 text-white/50 cursor-not-allowed"
                  }`}
              >
                Apply
              </button>

              <button
                onClick={detectViaGPS}
                title="Detect location"
                className="text-white/80 hover:text-white"
              >
                <Crosshair size={16} />
              </button>

              <button
                onClick={() => {
                  setShowInput(false);
                  setPincode("");
                  setError("");
                }}
                className="text-white/60 text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-300 text-xs px-4 pb-1">{error}</p>
        )}
      </div>
    </header>
  );
}
