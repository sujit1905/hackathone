// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import {
  PiBuildingLight,
  PiStudent,
  PiArrowFatLineRightBold,
} from "react-icons/pi";
import { HiArrowUpRight } from "react-icons/hi2";
import { motion } from "framer-motion";

// Hero images
const slides = ["/images/main01.svg", "/images/main032.svg", "/images/main03.svg"];

// Testimonial reviews
const reviews = [
  {
    text: "CampusConnect made it so easy to find and register for events. Loved the experience!",
    author: "— Sujit Mecwan",
  },
  {
    text: "I never miss any tech fest now. Everything is in one place and super simple to use.",
    author: "— Keval Radadiya",
  },
  {
    text: "Great way to discover cultural events and meet new people on campus.",
    author: "— Vishal Padhiyar",
  },
];

// Featured events
const featuredEvents = [
  {
    id: 1,
    title: "Aditya Birla Group Engenuity 2025",
    image: "/images/events01.png",
    cta: "Visit",
  },
  {
    id: 2,
    title: "Tata Imagination Challenge 2025",
    image: "/images/events02.png",
    cta: "Visit",
  },
  {
    id: 3,
    title: "TCS NQT Foundation Round",
    image: "/images/events03.png",
    cta: "Visit",
  },
  {
    id: 4,
    title: "Hackverse National Hackathon",
    image: "/images/events04.png",
    cta: "Visit",
  },
];

// Recently added
const recentEvents = [
  {
    id: 1,
    title: "Campus Design Sprint",
    image: "/images/events01.png",
    cta: "View",
  },
  {
    id: 2,
    title: "National Robotics League",
    image: "/images/events02.png",
    cta: "View",
  },
  {
    id: 3,
    title: "Cultural Night Fest 2025",
    image: "/images/events03.png",
    cta: "View",
  },
  {
    id: 4,
    title: "AI & ML Bootcamp",
    image: "/images/events04.png",
    cta: "View",
  },
];

const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Embla for featured
  const [featuredRef, featuredApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [featuredSelected, setFeaturedSelected] = useState(0);
  const [featuredSnaps, setFeaturedSnaps] = useState([]);

  // Embla for recent
  const [recentRef, recentApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  const [recentSelected, setRecentSelected] = useState(0);
  const [recentSnaps, setRecentSnaps] = useState([]);

  // Hero slider
  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((prev) => (prev + 1) % slides.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  // Review slider
  useEffect(() => {
    const id = setInterval(
      () => setReviewIndex((prev) => (prev + 1) % reviews.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Sync featured dots with Embla
  useEffect(() => {
    if (!featuredApi) return;

    const onSelect = () => {
      setFeaturedSelected(featuredApi.selectedScrollSnap());
    };

    const onInit = () => {
      setFeaturedSnaps(featuredApi.scrollSnapList());
      setFeaturedSelected(featuredApi.selectedScrollSnap());
    };

    featuredApi.on("select", onSelect);
    featuredApi.on("reInit", onInit);
    onInit();
  }, [featuredApi]);

  // Sync recent dots with Embla
  useEffect(() => {
    if (!recentApi) return;

    const onSelect = () => {
      setRecentSelected(recentApi.selectedScrollSnap());
    };

    const onInit = () => {
      setRecentSnaps(recentApi.scrollSnapList());
      setRecentSelected(recentApi.selectedScrollSnap());
    };

    recentApi.on("select", onSelect);
    recentApi.on("reInit", onInit);
    onInit();
  }, [recentApi]);

  const preventImgDrag = (e) => e.preventDefault();

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero + testimonial */}
      <section className="rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-slate-50 via-[#f3f4f9] to-slate-50 px-4 sm:px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-16 shadow-[0_18px_40px_rgba(15,23,42,0.06)] border border-slate-200/70 overflow-hidden relative">
        {/* subtle background blob */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#facc15]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#6366f1]/10 blur-3xl" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center relative">
          {/* Left: hero images */}
          <motion.div
            className="relative order-1 lg:order-none select-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="rounded-3xl bg-[#f2f3f8] overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] flex items-center justify-center border border-slate-200/70">
              <img
                src={slides[heroIndex]}
                alt="Campus events illustration"
                className="w-full max-w-md object-contain pointer-events-none"
                draggable={false}
                onDragStart={preventImgDrag}
              />
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === heroIndex ? "w-6 bg-[#1d4ed8]" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: text + buttons */}
          <motion.div
            className="space-y-5 sm:space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
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
              Explore events from the most vibrant and creative colleges, ready
              to inspire and engage your next experience.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Explore: just a button with shine animation class */}
              <button
                type="button"
                className="hero-explore-btn flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#111827] text-white text-sm sm:text-base font-semibold shadow-md hover:bg-slate-900 transition"
              >
                Explore
                <PiArrowFatLineRightBold />
              </button>

              {/* Navigation buttons */}
              <Link
                to="/events"
                className="flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-white text-slate-800 text-sm sm:text-base font-semibold shadow-sm border border-slate-200 hover:bg-slate-50 transition"
              >
                Events
                <HiArrowUpRight />
              </Link>

              <Link
                to="/clubs"
                className="flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-white text-slate-800 text-sm sm:text-base font-semibold shadow-sm border border-slate-200 hover:bg-slate-50 transition"
              >
                Clubs
                <HiArrowUpRight />
              </Link>
            </div>

            <div className="mt-4 rounded-3xl bg-white border border-slate-200 shadow-sm px-4 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm text-slate-500 max-w-md mx-auto lg:mx-0">
              <p className="mb-1 line-clamp-3">
                "{reviews[reviewIndex].text}"
              </p>
              <p className="text-sm sm:text-base font-semibold text-center text-[#6366f1]">
                {reviews[reviewIndex].author}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who is using section */}
      <section className="py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm px-6 py-6 text-center hover:shadow-md hover:-translate-y-1 transition">
                <div className="mb-3 text-2xl flex justify-center text-slate-800">
                  <PiStudent />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Students
                </h3>
                <p className="text-sm text-slate-500">
                  Explore and join college events that match your interests.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-slate-900 bg-slate-100 flex items-center justify-center text-center px-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-slate-700 mb-1">
                  Who is using
                </p>
                <p className="text-xl md:text-2xl font-semibold text-slate-900">
                  DNICA EventHub
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm px-6 py-6 text-center hover:shadow-md hover:-translate-y-1 transition">
                <div className="mb-3 text-2xl flex justify-center text-slate-800">
                  <PiBuildingLight />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Colleges
                </h3>
                <p className="text-sm text-slate-500">
                  Host, promote and manage campus events seamlessly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured events carousel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            <span className="border-b-4 border-[#f7a900] pb-1">Featured</span>{" "}
            events
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => featuredApi && featuredApi.scrollPrev()}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => featuredApi && featuredApi.scrollNext()}
              className="w-9 h-9 rounded-full bg-[#f7a900] text-white flex items-center justify-center shadow-sm hover:bg-[#f59e0b] transition"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden select-none" ref={featuredRef}>
          <div className="flex gap-4">
            {featuredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] bg-white rounded-[18px] shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition"
                whileHover={{ y: -4 }}
              >
                <div className="h-40 md:h-48 bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    onDragStart={preventImgDrag}
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm md:text-base font-medium text-slate-900 line-clamp-2">
                    {event.title}
                  </p>
                  <button className="ml-1 whitespace-nowrap text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
                    {event.cta} ↗
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3 gap-2">
          {featuredSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => featuredApi && featuredApi.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === featuredSelected ? "w-5 bg-[#f7a900]" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Recently Added carousel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            <span className="border-b-4 border-[#f7a900] pb-1">Recently</span>{" "}
            added
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => recentApi && recentApi.scrollPrev()}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => recentApi && recentApi.scrollNext()}
              className="w-9 h-9 rounded-full bg-[#f7a900] text-white flex items-center justify-center shadow-sm hover:bg-[#f59e0b] transition"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden select-none" ref={recentRef}>
          <div className="flex gap-4">
            {recentEvents.map((event) => (
              <motion.div
                key={event.id}
                className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] bg-white rounded-[18px] shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition"
                whileHover={{ y: -4 }}
              >
                <div className="h-40 md:h-48 bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    onDragStart={preventImgDrag}
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm md:text-base font-medium text-slate-900 line-clamp-2">
                    {event.title}
                  </p>
                  <button className="ml-1 whitespace-nowrap text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
                    {event.cta} ↗
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3 gap-2">
          {recentSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => recentApi && recentApi.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === recentSelected ? "w-5 bg-[#f7a900]" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
