"use client";

import React from "react";
import Link from "next/link";

const browserSupport = [
  "Microsoft Edge 81+",
  "Mozilla Firefox 75+",
  "Safari 5.1.5+",
  "Google Chrome 80+",
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        w-full mt-16
        bg-[#0c5f84]/40 dark:bg-zinc-950/70
        backdrop-blur-2xl
        border-t border-white/20 dark:border-zinc-800/60
        shadow-[0_-8px_32px_rgba(31,38,135,0.37)]
        dark:shadow-[0_-8px_32px_rgba(0,0,0,0.6)]
        text-white
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-sm">

          {/* Column */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              All Categories
            </h4>
            <ul className="space-y-3 text-white/80 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-white transition">Grocery</Link></li>
              <li><Link href="#" className="hover:text-white transition">Electronics</Link></li>
              <li><Link href="#" className="hover:text-white transition">Fashion</Link></li>
              <li><Link href="#" className="hover:text-white transition">Home & Lifestyle</Link></li>
              <li><Link href="#" className="hover:text-white transition">Premium Fruits</Link></li>
              <li><Link href="#" className="hover:text-white transition">Books</Link></li>
              <li><Link href="#" className="hover:text-white transition">Furniture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">
              Popular Categories
            </h4>
            <ul className="space-y-3 text-white/80 dark:text-zinc-400">
              <li>Biscuits & Drinks</li>
              <li>Fruits & Vegetables</li>
              <li>Cooking Essentials</li>
              <li>Dairy & Bakery</li>
              <li>Personal Care</li>
              <li>Beauty</li>
              <li>Home</li>
              <li>Mom & Baby Care</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">
              Customer Account
            </h4>
            <ul className="space-y-3 text-white/80 dark:text-zinc-400">
              <li>My Account</li>
              <li>My Orders</li>
              <li>Wishlist</li>
              <li>Delivery Addresses</li>
              <li>Wallet</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">
              Help & Support
            </h4>
            <ul className="space-y-3 text-white/80 dark:text-zinc-400">
              <li>About Us</li>
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>E-waste Policy</li>
              <li>Cancellation & Return</li>
              <li>Shipping & Delivery</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <p className="text-white/80 dark:text-zinc-400 mb-2">
              WhatsApp: <span className="font-medium">XXXXXXXXX</span>
            </p>
            <p className="text-white/80 dark:text-zinc-400 mb-2">
              Call: <span className="font-medium">1800XXXXXXX</span>
            </p>
            <p className="text-white/60 dark:text-zinc-500 mb-4">
              8:00 AM – 8:00 PM, 365 days
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-12 pt-6
            border-t border-white/20 dark:border-zinc-800/60
            flex flex-col md:flex-row
            items-center justify-between
            text-xs text-white/70 dark:text-zinc-500
            gap-4
          "
        >
          <p>© {year} All rights reserved.</p>
          <p className="text-center">
            Best viewed on {browserSupport.join(", ")}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
