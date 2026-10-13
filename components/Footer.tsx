import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Apple } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070a13] text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/logo.png"
                alt="GymOn"
                width={240}
                height={60}
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>


            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              India&apos;s platform for day-pass gyms. Find, request and work out – anytime, anywhere.
            </p>

            {/* Social Icons (Custom Clean SVGs) */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00b4d8] hover:border-[#00b4d8]/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00b4d8] hover:border-[#00b4d8]/40 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00b4d8] hover:border-[#00b4d8]/40 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00b4d8] hover:border-[#00b4d8]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#00b4d8] transition-colors">
                  Find Gyms
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-[#00b4d8] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00b4d8] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00b4d8] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#00b4d8] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Gyms */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">For Gyms</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/list-your-gym" className="text-[#00b4d8] hover:underline font-medium">
                  List Your Gym
                </Link>
              </li>
              <li>
                <Link href="/provider/login" className="hover:text-[#00b4d8] transition-colors">
                  Provider Login
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#00b4d8] transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00b4d8] transition-colors">
                  Partner Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & App Download */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-[#00b4d8] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00b4d8] transition-colors">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00b4d8] transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-semibold text-sm">Download App</h4>
                <span className="bg-[#00b4d8]/15 text-[#00b4d8] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>

              {/* Store buttons */}
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-[#0d1424] hover:bg-[#111a2e] border border-slate-800 px-4 py-2 rounded-xl transition-all group"
                >
                  <Smartphone className="w-5 h-5 text-slate-300 group-hover:text-[#00b4d8]" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      GET IT ON
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      Google Play
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-[#0d1424] hover:bg-[#111a2e] border border-slate-800 px-4 py-2 rounded-xl transition-all group"
                >
                  <Apple className="w-5 h-5 text-slate-300 group-hover:text-[#00b4d8]" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      DOWNLOAD ON THE
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      App Store
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 font-medium">
          &copy; 2024 GYM ON. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
