"use client";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-500 dark:via-yellow-600 dark:to-yellow-700 text-gray-800 dark:text-white rounded-xl shadow-2xl transition-transform duration-300 hover:scale-110 transform ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
