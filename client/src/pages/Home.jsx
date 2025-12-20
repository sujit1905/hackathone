// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  "/images/engineer-4922413_1280.jpg",
  "/images/istockphoto-1761638528-1024x1024.jpg",
  "/images/istockphoto-1909556559-1024x1024.jpg",
  "/images/istockphoto-2186780950-1024x1024.jpg",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Grey division below navbar */}
      <section className="rounded-[24px] md:rounded-[32px] bg-[#f3f4f6] px-4 sm:px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-16 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left: illustration slider */}
          <div className="relative order-1 lg:order-none">
            <div className="rounded-3xl bg-[#f2f3f8] overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center justify-center">
              <img
                src={slides[index]}
                alt="Campus events illustration"
                className="w-full max-w-md object-contain"
              />
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-[#1d4ed8]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: text + buttons */}
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#6366f1]">
              Campus events, simplified
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Discover India&apos;s{" "}
              <span className="text-[#f7a900]">best social</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              events, <span className="text-[#f7a900]">all</span> in one place
            </h1>

            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto lg:mx-0">
              Explore events from the most vibrant and creative colleges,
              ready to inspire and engage your next experience.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                to="/events"
                className="flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#111827] text-white text-sm sm:text-base font-semibold shadow-md"
              >
                Explore
                <span className="text-xs">↗</span>
              </Link>

              <Link
                to="/events"
                className="flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-white text-slate-800 text-sm sm:text-base font-semibold shadow-sm"
              >
                Events
                <span className="text-xs">↗</span>
              </Link>

              <Link
                to="/clubs"
                className="flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-white text-slate-800 text-sm sm:text-base font-semibold shadow-sm"
              >
                Clubs
                <span className="text-xs">↗</span>
              </Link>
            </div>

            <div className="mt-4 rounded-3xl bg-white border border-slate-200 shadow-sm px-4 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm text-slate-500 max-w-md mx-auto lg:mx-0">
              <p className="mb-1">
                “CampusConnect made it so easy to find and register for
                events. Loved the experience!”
              </p>
              <p className="text-[11px] sm:text-xs text-right text-[#6366f1]">
                — Student user
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
