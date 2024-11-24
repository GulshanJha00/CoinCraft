import React from 'react'
import { FlipWords } from './ui/flip-words'


const HomeTile = () => {

  const words = ["Track", "Precise", "Advanced", "Smart"];

  return (
    <div>
      <h1
            className="text-2xl text-gray-300 dark:text-white sm:text-3xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text mb-4 animate__animated animate__fadeInUp"
            style={{
              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            <span className="text-yellow-400 dark:text-yellow-400">
              CoinVerse:
            </span>{" "}
            <FlipWords words={words} /> <br />
             Your Crypto{" "}
            <span className="underline decoration-yellow-600 dark:decoration-yellow-400">
              Journey
            </span>
          </h1>
    </div>
  )
}

export default HomeTile
