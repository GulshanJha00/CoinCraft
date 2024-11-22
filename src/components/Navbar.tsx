"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme(); // Theme context for toggling light/dark modes
  const [currency, setCurrency] = useState("USD"); // State to manage selected currency

  // Handle changes in currency selection
  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  

  return (
    <>
      {/* Navbar Container */}
      <div className="bg-blue-900 flex justify-between items-center w-full h-20 px-8 py-4 shadow-lg">
        
        {/* Title Section on the left*/}
        <div className="text-yellow-400 font-bold lg:text-3xl sm:text-xl text-md">
          <h1>Coin Verse</h1>
        </div>

        {/* Right Section - Currency Selector & Theme Toggle */}
        <div className="flex lg:gap-8 gap-4 items-center">
          
          {/* Currency Dropdown using material ui */}
          <div>
            <FormControl>
              <InputLabel
                id="currency-select-label"
                className="text-white text-sm"
              >
                Currency
              </InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={currency}
                label="Currency"
                onChange={handleCurrencyChange}
                className="text-white bg-transparent border-white focus:ring-2 focus:ring-blue-500 text-sm lg:text-md"
              >
                <MenuItem className="text-sm lg:text-md text-white" value={"USD"}>USD</MenuItem>
                <MenuItem className="text-sm lg:text-md text-white" value={"INR"}>INR</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Theme Toggle Button using shadcn */}
          <div>
            <Button
              variant="outline"
              size="icon"
              className="z-50 bg-transparent text-white h-[3rem] w-[3rem] border-2 border-white rounded-full flex justify-center items-center hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme
            >
              {/* Conditionally render icon based on current theme chosen above*/}
              {theme === "dark" ? (
                <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
              ) : (
                <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
