import React from 'react'
import Link from 'next/link'
import HomeTile from './HomeTitle'
import Carousel from './Carousel'
import Button from './Button'
const TextSection = () => {
  return (
    <div className="relative z-5 max-w-4xl p-6 sm:p-10 text-center">
            <HomeTile />
            <Carousel />

            <p
              className="para text-lg sm:text-xl mb-6 sm:mb-8 max-w-full mx-auto font-bold text-yellow-600 dark:text-yellow-200 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 p-4 rounded-lg shadow-lg"
              style={{
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
              }}
            >
              Real-time data, personalized tracking, and an intuitive interface.
              <span className="font-bold text-gray-800 dark:text-white">
                {' '}
                Dive Into the Details and Stay Ahead in the Crypto Game
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/home">
                <Button text="Start Tracking" />
              </Link>

              
              
            </div>
          </div>
  )
}

export default TextSection
