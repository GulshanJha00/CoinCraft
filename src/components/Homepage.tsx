'use client';
import React, { useEffect } from 'react';
import { FollowerPointerCard } from '../components/ui/following-pointer';
import gsap from 'gsap'; // Import GSAP
import ChooseUs from './ChooseUs';
import { HeroParallaxDemo } from './HeroParallaxCard';
import BottomNavigation from './NavButton';
import TextSection from './TextSection';

const Homepage: React.FC = () => {
  useEffect(() => {
    // GSAP animation for the .para class
    gsap.fromTo(
      '.para',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <FollowerPointerCard>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section
          className="h-screen bg-cover bg-center relative flex items-center justify-center text-gray-800 dark:text-white text-center"
          style={{
            backgroundImage: `url('/bg-homepage.jpg')`,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 backdrop-blur-[5px]"></div>

          <div>
            <TextSection />
          </div>
        </section>

        <div>
          <ChooseUs />
        </div>

        <div>
          <HeroParallaxDemo />
        </div>



        <div>
          <BottomNavigation />
        </div>
      </div>
    </FollowerPointerCard>
  );
};

export default Homepage;
