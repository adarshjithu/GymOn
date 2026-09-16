"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[#090d16] text-white sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">




        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group focus:outline-none">
          <div className="flex items-center gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-white font-sans">
              Gym
            </span>
            <span className="bg-[#00b4d8] text-slate-950 font-bold text-xl px-2.5 py-0.5 rounded-lg leading-none shadow-sm shadow-[#00b4d8]/20">
              On
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.24em] text-[#00b4d8] uppercase mt-0.5">
            Access <span className="text-white">Every</span> Gym
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors relative py-1 ${isActive("/")
                ? "text-[#00b4d8] font-semibold after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[2px] after:bg-[#00b4d8] after:rounded-full"
                : "text-slate-300 hover:text-white"
              }`}
          >
            Home
          </Link>

          <Link
            href="/gyms"
            className={`transition-colors ${isActive("/gyms") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            Find Gyms
          </Link>

          <Link
            href="/list-your-gym"
            className={`transition-colors ${isActive("/list-your-gym") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            List Your Gym
          </Link>

          <Link
            href="/about"
            className={`transition-colors ${isActive("/about") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`transition-colors ${isActive("/contact") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Login Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-sm"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d16] px-4 pt-2 pb-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#00b4d8] font-semibold py-2"
          >
            Home
          </Link>
          <Link
            href="/gyms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            Find Gyms
          </Link>
          <Link
            href="/list-your-gym"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            List Your Gym
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-full text-xs font-semibold"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
