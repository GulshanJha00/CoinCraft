'use client';

export default function AboutSection() {
  return (
    <section className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-16 sm:py-12 px-6">
      {/* Semi-Sexy Background Animation */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30">
        <div className="h-full w-full bg-gradient-to-r from-black via-transparent to-black"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <h2 className="text-4xl sm:text-3xl text-white font-semibold mb-6 animate__animated animate__fadeInUp">
          Welcome to Our Amazing Platform!
        </h2>
        <p className="text-lg sm:text-base text-white opacity-80 mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          We offer a one-stop solution for all your cryptocurrency needs. Stay updated with real-time data and insights, tailored to help you make informed decisions.
        </p>
        <a
          href="#"
          className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full text-lg sm:text-base hover:bg-pink-700 transition ease-in-out duration-300 animate__animated animate__fadeInUp animate__delay-2s"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
