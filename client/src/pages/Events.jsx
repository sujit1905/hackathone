// src/pages/Events.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

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

// demo data reused for All Events
const allEvents = featuredEvents;

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Events = () => {
  const [query, setQuery] = useState("");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState([]);

  const filteredFeatured = featuredEvents.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAll = allEvents.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onInit = () => {
      setSnapPoints(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    onInit();
  }, [emblaApi]);

  const preventImgDrag = (e) => e.preventDefault();

  return (
    <motion.div
      className="pb-12"
      style={{ background: "#f5f7fb" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Search bar */}
      <motion.div
        className="mt-2 mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="w-full rounded-full bg-white px-6 py-3 flex items-center gap-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] border border-slate-100">
          <CiSearch className="text-2xl text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, competitions, hackathons..."
            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-slate-800"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 text-lg"
            >
              ✕
            </button>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-[#facc15] text-slate-900 text-lg shadow-sm"
          >
            <CiSearch />
          </motion.button>
        </div>
      </motion.div>

      {/* Featured section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            <span className="border-b-4 border-[#f7a900] pb-1">Featured</span>{" "}
            events
          </h2>
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50"
            >
              ‹
            </button>
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="w-9 h-9 rounded-full bg-[#111827] text-white flex items-center justify-center shadow-sm hover:bg-black"
            >
              ›
            </button>
          </div>
        </div>

        {filteredFeatured.length === 0 ? (
          <p className="text-sm text-slate-500">
            No events match your search yet.
          </p>
        ) : (
          <>
            <div className="overflow-hidden select-none" ref={emblaRef}>
              <div className="flex gap-4">
                {filteredFeatured.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] bg-white rounded-[18px] shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-slate-200 overflow-hidden"
                  >
                    <div className="h-44 sm:h-52 bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                        onDragStart={preventImgDrag}
                      />
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between gap-2">
                      <p className="text-sm sm:text-base font-medium text-slate-900 line-clamp-2">
                        {event.title}
                      </p>
                      <Link
                        to="#"
                        className="inline-flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm px-3 py-1.5 rounded-full bg-slate-900 text-white shadow-sm"
                      >
                        {event.cta}
                        <FaArrowRightLong className="text-[10px]" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-3 gap-2">
              {snapPoints.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi && emblaApi.scrollTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === selectedIndex ? "w-5 bg-[#111827]" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* All events */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            <span className="border-b-4 border-[#111827] pb-1">All</span>{" "}
            Events
          </h2>

          <div className="flex gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-100 bg-white">
              Clear Filters
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-100 bg-white">
              Filter
              <span className="text-xs">▾</span>
            </button>
          </div>
        </div>

        {filteredAll.length === 0 ? (
          <p className="text-sm text-slate-500">
            No events match your search yet.
          </p>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAll.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                className="relative"
              >
                {/* very subtle animated halo */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#22c55e1a] via-[#3b82f61a] to-[#facc151a] blur-xl opacity-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.06, 0.16, 0.06] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative bg-white border border-slate-200 rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.06)] px-5 pt-4 pb-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="text-[11px] text-slate-400">Reach 0</div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Live
                      </span>
                      <button className="h-7 w-7 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300">
                        ♡
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500">UNSTOP</p>
                    <p className="text-xs text-slate-500">Unstop</p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2 text-amber-600">
                      <span>🕒</span>
                      <span>Online</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <span>📅</span>
                      <span>30 November 2025</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-700">
                      <span>👥</span>
                      <span>Participants: 2 - 3</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <button className="flex-1 px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-black">
                      Get Detail
                    </button>
                    <span className="px-4 py-2.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold">
                      FREE
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500 space-y-1">
                    <p>Registration Opens: 24 November 2025</p>
                    <p className="text-rose-500">
                      closing on : 01 January 2026
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};

export default Events;
