"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import products from "../../public/data/all-products"

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
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<typeof products>([]);


  useEffect(() => {
    if (showInput) inputRef.current?.focus();
  }, [showInput]);

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

  function handleOnChange(query: string) {
    setInputValue(query);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5);
    setSuggestions(filtered);
  }

  return (
    <header className="w-full">

      {/* ================= FIRST BAR ================= */}
      <div className="sticky top-0 z-50 bg-[#0c5f84]/40 backdrop-blur-2xl border-b border-white/20 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">

          {/* ROW 1 */}
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">

            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <img width="90" src="/Logo.png" alt="Logo" />
            </Link>

            {/* Toggle (hidden on small) */}
            <div className="hidden md:flex justify-between rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
              <button className="bg-white/80 px-8 py-1 m-2 font-black rounded-2xl text-black shadow">
                Quick
              </button>
              <button className="px-8 py-1 m-2 font-black rounded-2xl text-white/90">
                Scheduled
              </button>
            </div>

            {/* Search (desktop) */}
            <div className="hidden md:flex flex-1 items-center rounded-full px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30">
              <Search size={18} className="text-white/80" />
              <input
                type="search"
                value={inputValue}
                ref={searchInputRef}
                placeholder="Search in Quick"
                className="bg-transparent ml-2 w-full outline-none placeholder:text-white/70"
                onChange={(e) => handleOnChange(e.target.value)}
              />
              {/* here search query suggestions ui start */}
              {suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white text-black rounded-xl shadow-xl overflow-hidden z-50">
                  {suggestions.map((product) => (
                    <Link
                      key={product._id}
                      href={`/p/${product.slug}`}
                      className="block mx-2 my-1.5 px-4 py-3 rounded-xl hover:bg-gray-900 hover:text-white text-sm"
                      onClick={() => {
                        setInputValue("");
                        setSuggestions([]);
                      }}
                    >
                      <span >{product.name}</span> <span className="font-bold">-₹{product.mrp}</span>
                    </Link>
                  ))}
                </div>
              )}

            </div>


            {/* Icons */}
            <div className="flex items-center gap-4 ml-auto">
              <Menu className="md:hidden" />
              <ShoppingCart />
              <Link href="/login" className="flex items-center gap-1">
                <User />
                <span className="hidden md:block">Sign In</span>
              </Link>
            </div>
          </div>

          {/* Search (mobile) */}
          <div className="md:hidden mt-3">
            <div className="flex items-center rounded-full px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30">
              <Search size={16} />
              <input
                placeholder="Search in Quick"
                className="bg-transparent ml-2 w-full outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECOND BAR ================= */}
      <div className="bg-[#083f57]/40 backdrop-blur-xl text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 px-4 py-2 text-xs md:text-sm">

          <span
            className="
    px-3 py-1 rounded-full font-semibold whitespace-nowrap
    bg-gray-200/30
    text-whitte
    backdrop-blur-xl
    border border-white/40
    shadow-[0_8px_32px_rgba(31,38,135,0.25)]
  "
          >
            Delivery in 10 to 30 mins
          </span>


          <span className="truncate max-w-[220px] md:max-w-none">
            Quick Delivery to: <strong>{location}</strong>
          </span>

          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-1 underline"
            >
              <MapPin size={14} />
              Change
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-3 py-1">
              <input
                ref={inputRef}
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                maxLength={6}
                placeholder="Enter pincode"
                className="bg-transparent outline-none w-24 text-sm"
              />

              <button
                onClick={handleSubmit}
                disabled={pincode.length !== 6}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${pincode.length === 6
                  ? "bg-white/80 text-[#0c5f84]"
                  : "bg-white/30 text-white/50"
                  }`}
              >
                Apply
              </button>

              <button onClick={detectViaGPS}>
                <Crosshair size={16} />
              </button>

              <button
                onClick={() => {
                  setShowInput(false);
                  setPincode("");
                  setError("");
                }}
                className="text-xs opacity-70"
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
