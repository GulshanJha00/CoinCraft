"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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

  return (
    <>
      {/* Navbar Container */}
      <div className="bg-blue-900 flex sticky top-0 z-10 justify-between items-center w-full h-20 px-8 py-4 shadow-lg">
        
        {/* Title Section on the left */}
        <div className="text-yellow-400 font-bold lg:text-3xl sm:text-xl text-md">
          <h1>Coin Verse</h1>
        </div>

        {/* Right Section - Theme Toggle & Hamburger Menu */}
        <div className="flex lg:gap-8 gap-4 items-center">
          
          {/* Theme Toggle Button */}
          <button
            className="z-50 bg-transparent text-white h-[3rem] w-[3rem] border-2 border-white rounded-full flex justify-center items-center hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme
          >
            {/* Conditionally render icon based on current theme */}
            {theme === "dark" ? (
              <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
            ) : (
              <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile Hamburger Menu Button (Visible only below 'md' screen) */}
          <button
            className="lg:hidden text-white text-3xl z-20" // Added z-20 to make sure button is above the overlay
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu visibility
          >
            {/* Hamburger icon when menu is closed, Cross when menu is open */}
            {isMenuOpen ? (
              <span className="text-3xl">&#10005;</span> // Cross icon
            ) : (
              <span className="text-3xl">&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>
        
        {/* Mobile Menu - Show on screens below 'md' */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full bg-blue-900 bg-opacity-95 flex flex-col items-center justify-center space-y-4 p-6 transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <nav className="flex flex-col items-center gap-4 text-white text-xl">
            <a href="#home" className="hover:text-yellow-400">Home</a>
            <a href="#favorites" className="hover:text-yellow-400">Favorites</a>
            <a href="#exchanges" className="hover:text-yellow-400">Exchanges</a>
            <a href="#about" className="hover:text-yellow-400">About</a>
          </nav>
        </div>

        {/* Desktop Menu - Show on large screens */}
        <div className="hidden lg:flex flex-row gap-8 items-center text-white text-xl">
          <a href="#favorites" className="hover:text-yellow-400">Favorites</a>
          <a href="#exchanges" className="hover:text-yellow-400">Exchanges</a>
          <a href="#about" className="hover:text-yellow-400">About</a>
        </div>

      </div>
    </>
  );
};

export default Navbar;
