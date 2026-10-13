"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="flex items-center focus:outline-none">
          <Image
            src="/logo.png"
            alt="GymOn"
            width={240}
            height={60}
            className="h-12 sm:h-14 w-auto object-contain"
            priority
          />
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
            href="/faq"
            className={`transition-colors ${isActive("/faq") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            FAQ
          </Link>

          <Link
            href="/contact"
            className={`transition-colors ${isActive("/contact") ? "text-[#00b4d8] font-semibold" : "text-slate-300 hover:text-white"
              }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
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
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-2"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
