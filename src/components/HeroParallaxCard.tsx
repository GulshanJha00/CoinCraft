"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export function HeroParallaxDemo() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      
      <div className="mt-12">
        {/* Parallax Feature Showcase */}
        <HeroParallax products={products} />
      </div>
    </section>
  );
}

export const products = [
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature1.jpg",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature2.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature3.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature4.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature5.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
      "/feature6.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature7.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature8.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature9.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature10.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature11.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature12.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature13.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature14.webp",
  },
  {
    title: "CryptoCoin",
    link: "#link",
    thumbnail:
    "/feature15.webp",
  },
];
