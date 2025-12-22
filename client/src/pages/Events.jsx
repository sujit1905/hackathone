// src/pages/Events.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    mode: "online",
    registrationStatus: "open",
    feeType: "free",
  },
  {
    id: 2,
    title: "Tata Imagination Challenge 2025",
    image: "/images/events02.png",
    cta: "Visit",
    mode: "online",
    registrationStatus: "open",
    feeType: "free",
  },
  {
    id: 3,
    title: "TCS NQT Foundation Round",
    image: "/images/events03.png",
    cta: "Visit",
    mode: "offline",
    registrationStatus: "closed",
    feeType: "paid",
  },
  {
    id: 4,
    title: "Hackverse National Hackathon",
    image: "/images/events04.png",
    cta: "Visit",
    mode: "online",
    registrationStatus: "open",
    feeType: "paid",
  },
];

// reuse for “All Events” section
const allEvents = featuredEvents;

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Events = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // filters
  const [filters, setFilters] = useState({
    mode: "all",
    status: "all",
    fee: "all",
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Embla for featured carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState([]);

  // All-events filtered list (search + filters)
  const filteredAll = allEvents.filter((e) => {
    const matchQuery = e.title.toLowerCase().includes(query.toLowerCase());
    const matchMode = filters.mode === "all" ? true : e.mode === filters.mode;
    const matchStatus =
      filters.status === "all" ? true : e.registrationStatus === filters.status;
    const matchFee = filters.fee === "all" ? true : e.feeType === filters.fee;

    return matchQuery && matchMode && matchStatus && matchFee;
  });

  // Suggestions list for dropdown (from all events)
  const suggestions = allEvents.filter((e) =>
    query.trim()
      ? e.title.toLowerCase().includes(query.toLowerCase())
      : false
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setSnapPoints(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    onInit();
  }, [emblaApi]);

  const preventImgDrag = (e) => e.preventDefault();

  const handleSuggestionClick = (event) => {
    setQuery("");
    setShowSuggestions(false);
    navigate(`/events/${event.id}`);
  };

  const clearFilters = () => {
    setFilters({ mode: "all", status: "all", fee: "all" });
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
  };

  return (
    <div className="pb-12">
      {/* Search bar + suggestions */}
      <div className="mt-4 mb-8 relative">
        <div className="w-full rounded-full bg-[#f3f4f6] px-6 py-3 flex items-center gap-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <CiSearch className="text-2xl text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => query && setShowSuggestions(true)}
            placeholder="Search events, competitions, hackathons..."
            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-slate-800"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
              }}
              className="text-slate-400 hover:text-slate-600 text-lg"
            >
              ✕
            </button>
          )}
          {/* REMOVED yellow search icon button */}
          {/* 
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#fbbf24] text-slate-900 text-lg">
            <CiSearch />
          </button>
          */}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.16)] border border-slate-200 max-h-72 overflow-y-auto z-30">
            {suggestions.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => handleSuggestionClick(ev)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
              >
                <p className="text-sm font-medium text-slate-900">
                  {ev.title}
                </p>
                <p className="text-[11px] text-slate-500">UNSTOP · Unstop</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured section (carousel) */}
      {/* ... rest of your component stays exactly the same ... */}
      {/* (no other changes needed to remove the yellow icon) */}
      {/* Featured section, All events list, etc. unchanged */}
      {/* keep everything below from your current file */}
      {/* ----- */}
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
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm"
            >
              ‹
            </button>
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="w-9 h-9 rounded-full bg-[#f7a900] text-white flex items-center justify-center shadow-sm"
            >
              ›
            </button>
          </div>
        </div>

        {featuredEvents.length === 0 ? (
          <p className="text-sm text-slate-500">
            No featured events available.
          </p>
        ) : (
          <>
            <div className="overflow-hidden select-none" ref={emblaRef}>
              <div className="flex gap-4">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] bg-white rounded-[18px] shadow-sm border border-slate-200 overflow-hidden"
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
                        to={`/events/${event.id}`}
                        className="inline-flex items-center gap-1 whitespace-nowrap text-xs sm:text-sm px-3 py-1.5 rounded-full bg-slate-900 text-white"
                      >
                        {event.cta}
                        <FaArrowRightLong className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-3 gap-2">
              {snapPoints.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi && emblaApi.scrollTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === selectedIndex ? "w-5 bg-[#f7a900]" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* All events list with animation */}
      {/* (unchanged code for All Events section goes here) */}
      {/* ... keep your existing All Events section exactly as in your snippet ... */}
    </div>
  );
};

export default Events;
