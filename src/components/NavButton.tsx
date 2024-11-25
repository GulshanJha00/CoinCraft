"use client";
import React from "react";
import Link from "next/link";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const BottomNavigation: React.FC = () => {
  const navItems: NavItem[] = [
    { href: "/home/favorites", icon: "⭐", label: "Favorites" },
    { href: "/home/exchange", icon: "💱", label: "Exchange" },
    { href: "/home/about", icon: "ℹ️", label: "About" },
  ];

  return (
    <nav className="fixed lg:hidden flex bottom-0 z-50 left-0 right-0 bg-gray-100 dark:bg-gray-900 shadow-lg text-gray-800 dark:text-white justify-between sm:justify-around items-center px-6 sm:px-10 py-3 border-t border-gray-300 dark:border-gray-700">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <button className="text-yellow-600 hover:text-yellow-400 flex flex-col items-center">
            <span>{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;
