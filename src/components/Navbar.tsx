"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme(); // Theme context for toggling light/dark modes
  const [mounted, setMounted] = useState(false); // State to track if the component has mounted

  // Use useEffect to set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR to avoid mismatch in HTML
  if (!mounted) return null;

  return (
    <>
      {/* Navbar Container */}
      <div className="bg-blue-900 flex justify-between items-center w-full h-20 px-8 py-4 shadow-lg">
        
        {/* Title Section on the left */}
        <div className="text-yellow-400 font-bold lg:text-3xl sm:text-xl text-md">
          <h1>Coin Verse</h1>
        </div>

        {/* Right Section - Currency Selector & Theme Toggle */}
        <div className="flex lg:gap-8 gap-4 items-center">
          
          {/* Currency Dropdown using material ui */}
          <div>
            
          </div>

          {/* Theme Toggle Button */}
          <div>
            <button
              className="z-50 bg-transparent text-white h-[3rem] w-[3rem] border-2 border-white rounded-full flex justify-center items-center hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme
            >
              {/* Conditionally render icon based on current theme chosen above */}
              {theme === "dark" ? (
                <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
              ) : (
                <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
