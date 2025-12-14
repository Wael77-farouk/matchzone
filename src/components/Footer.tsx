"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Facebook, Instagram, Flame, Linkedin, PhoneCall } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b0f16] text-white mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">

          {/* Logo & Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="text-3xl font-extrabold flex items-center gap-2">
              <Flame className="text-red-500" size={30} />
              <span className="hover:text-red-500 transition-colors">MatchZone</span>
            </Link>

            <p className="text-sm text-gray-400 mt-4 max-w-xs">
              Your ultimate source for reliable sports data and news.
            </p>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">Developed by</p>
              <p className="font-semibold text-sm text-gray-300">Wael Farouk Adeeb</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-red-400">Navigation</h3>
            <ul className="space-y-3 text-sm">
              {['Leagues', 'Standings', 'Teams', 'News'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-red-400">Support</h3>
            <ul className="space-y-3 text-sm">
              {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {item === 'Privacy' ? 'Privacy Policy' : item === 'Terms' ? 'Terms of Use' : item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-red-400">Other Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/sportswebsites"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  Sports Websites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

          {/* Copyright */}
          <p className="text-center md:text-left text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} MatchZone. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/keroles.farouk.39" aria-label="Facebook">
              <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-400 transition transform hover:scale-110" />
            </a>

            <a href="https://www.instagram.com/cries_77" aria-label="Instagram">
              <Instagram className="w-6 h-6 text-pink-600 hover:text-pink-400 transition transform hover:scale-110" />
            </a>

            <a href="https://wa.me/201203965665" aria-label="WhatsApp">
              <PhoneCall className="w-6 h-6 text-green-500 hover:text-green-400 transition transform hover:scale-110" />
            </a>

            <a href="mailto:waelfarouk1142001@gmail.com" aria-label="Email">
              <Mail className="w-6 h-6 text-red-500 hover:text-red-400 transition transform hover:scale-110" />
            </a>

            <a href="https://www.linkedin.com/in/wael-farouk-733155246" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-blue-500 hover:text-blue-400 transition transform hover:scale-110" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
