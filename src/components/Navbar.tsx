"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Trophy,
  Globe,
  Flame,
  Newspaper,
  Users,
  Gamepad2,
} from "lucide-react";
import { FC } from "react";

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0b0f16] text-white border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="w-full flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 md:py-4">

        {/* Logo - محسّن للموبايل */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-extrabold hover:scale-105 transition-transform">
          <Flame className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            MatchZone
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
          <Link 
            href="/sportswebsites" 
            className="hover:text-red-400 transition-colors duration-200 hover:scale-105 transform"
          >
            Sports Websites
          </Link>

          <Link 
            href="/leagues" 
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-200 hover:scale-105 transform"
          >
            <Globe size={16} /> 
            <span>Leagues</span>
          </Link>

          <Link 
            href="/standings" 
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-200 hover:scale-105 transform"
          >
            <Trophy size={16} /> 
            <span>Standings</span>
          </Link>

          <Link 
            href="/teams" 
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-200 hover:scale-105 transform"
          >
            <Users size={16} />
            <span>Teams</span>
          </Link>

          <Link 
            href="/news" 
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-200 hover:scale-105 transform"
          >
            <Newspaper size={16} />
            <span>News</span>
          </Link>

          <Link 
            href="/game" 
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200 hover:scale-105 transform"
          >
            <Gamepad2 size={16} />
            <span>Games</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors active:scale-95 transform"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
        </button>
      </div>

      {/* Mobile Menu - محسّن بالكامل */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0b0f16] border-t border-gray-800 px-3 sm:px-4 py-4 sm:py-5 space-y-1 animate-fadeIn">

          <Link 
            href="/sportswebsites" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg hover:bg-gray-800/50 hover:text-red-400 transition-all active:scale-95 transform text-sm sm:text-base"
            onClick={() => setMobileOpen(false)}
          >
            <Globe size={18} className="sm:w-5 sm:h-5" />
            <span>Sports Websites</span>
          </Link>

          <Link 
            href="/leagues" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg hover:bg-gray-800/50 hover:text-red-400 transition-all active:scale-95 transform text-sm sm:text-base"
            onClick={() => setMobileOpen(false)}
          >
            <Globe size={18} className="sm:w-5 sm:h-5" />
            <span>Leagues</span>
          </Link>

          <Link 
            href="/standings" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg hover:bg-gray-800/50 hover:text-red-400 transition-all active:scale-95 transform text-sm sm:text-base"
            onClick={() => setMobileOpen(false)}
          >
            <Trophy size={18} className="sm:w-5 sm:h-5" />
            <span>Standings</span>
          </Link>

          <Link 
            href="/teams" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg hover:bg-gray-800/50 hover:text-red-400 transition-all active:scale-95 transform text-sm sm:text-base"
            onClick={() => setMobileOpen(false)}
          >
            <Users size={18} className="sm:w-5 sm:h-5" />
            <span>Teams</span>
          </Link>

          <Link 
            href="/news" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg hover:bg-gray-800/50 hover:text-red-400 transition-all active:scale-95 transform text-sm sm:text-base"
            onClick={() => setMobileOpen(false)}
          >
            <Newspaper size={18} className="sm:w-5 sm:h-5" />
            <span>News</span>
          </Link>

          <Link 
            href="/game" 
            className="flex items-center gap-2.5 py-3 px-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg transition-all active:scale-95 transform font-medium text-sm sm:text-base mt-2"
            onClick={() => setMobileOpen(false)}
          >
            <Gamepad2 size={18} className="sm:w-5 sm:h-5" />
            <span>Games</span>
          </Link>

        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;