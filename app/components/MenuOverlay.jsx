"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/intake", label: "Intake" },
  { href: "/rapport", label: "Rapport" },
  { href: "/pricing", label: "Prijzen" },
  { href: "/contact", label: "Contact" },
];

export default function MenuOverlay() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {!menuOpen && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-800 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            <Menu className="w-6 h-6 hover:text-blue-600 hover:scale-110 transition duration-200 cursor-pointer" />
          </button>
        </div>
      )}

      {hydrated && (
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 p-6 flex flex-col text-gray-800 font-medium text-lg"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="self-end mb-6 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
                >
                  <X className="w-6 h-6 hover:text-blue-600 hover:scale-110 transition duration-200 cursor-pointer" />
                </button>

                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="hover:underline mb-2"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
