"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme(); // Theme context for toggling light/dark modes
  const [mounted, setMounted] = useState(false); // State to track if the component has mounted
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  // Use useEffect to set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR to avoid mismatch in HTML
  if (!mounted) return null;

  const navbarBg =
    theme === "dark"
      ? "bg-opacity-20 backdrop-blur-lg bg-yellow-50 "
      : "bg-white shadow-md";
  const textColor = theme === "dark" ? "text-white" : "text-yellow-400";

  return (
    <>
      {/* Navbar Container */}
      <div
        className={`flex sticky top-0 z-50 justify-between items-center w-full h-20 px-8 py-4 ${navbarBg} transition-colors duration-300`}
      >
        {/* Title Section on the left */}
        <div
          className={`text-yellow-400 font-extrabold lg:text-4xl sm:text-2xl text-lg tracking-wide`}
        >
          <Link href={"/"}>
          
            <h1 className="hover:text-yellow-300 transition-all duration-300">
              Coin<span className="text-blue-500 dark:text-white drop-shadow-lg ">Verse</span>
            </h1>
          </Link>
        </div>

        {/* Right Section - Theme Toggle & Hamburger Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            className="bg-transparent h-[3rem] w-[3rem] border-2 dark:border-white border-black rounded-full flex justify-center items-center hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
            ) : (
              <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile Hamburger Menu Button (Visible only below 'lg') */}
          <button
            className={`lg:hidden ${textColor} text-3xl z-20`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <span className="text-3xl">&#10005;</span>
            ) : (
              <span className="text-3xl">&#9776;</span>
            )}
          </button>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full bg-blue-900 bg-opacity-95 flex flex-col items-center justify-center space-y-4 p-6 transition-transform duration-300 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <nav className="flex flex-col items-center gap-4 text-xl">
              <a href="#home" className={`${textColor}`}>
                Home
              </a>
              <a href="#favorites" className={`${textColor}`}>
                Favorites
              </a>
              <a href="#exchanges" className={`${textColor}`}>
                Exchanges
              </a>
              <a href="#about" className={`${textColor}`}>
                About
              </a>
            </nav>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-xl font-bold ">
          <Link
              href="/home"
              className={`hover:${
                theme === "dark" ? "text-yellow-400" : "text-black"
              } ${textColor} transition-colors duration-300 p-3 hover:bg-black dark:hover:bg-white rounded-xl`}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className={`hover:${
                theme === "dark" ? "text-yellow-400" : "text-black"
              } ${textColor} transition-colors duration-300 p-3 hover:bg-black dark:hover:bg-white rounded-xl`}
            >
              Favorites
            </Link>
            <a
              href="#exchanges"
              className={`hover:${
                theme === "dark" ? "text-yellow-400" : "text-black"
              } ${textColor} transition-colors duration-300 p-3 hover:bg-black dark:hover:bg-white rounded-xl`}
            >
              Exchanges
            </a>
            <a
              href="#about"
              className={`hover:${
                theme === "dark" ? "text-yellow-400" : "text-black"
              } ${textColor} transition-colors duration-300 p-3 hover:bg-black dark:hover:bg-white rounded-xl`}
            >
              About
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
