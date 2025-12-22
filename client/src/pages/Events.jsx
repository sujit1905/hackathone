// src/pages/Events.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCalendarDays, LuUsers } from "react-icons/lu";
import { PiGlobeHemisphereWestLight } from "react-icons/pi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const featuredEvents = [
  {
    id: 1,
    title: "Aditya Birla Group Engenuity 2025",
    image: "/images/events01.png",
    cta: "Visit",
    mode: "online",
    registrationStatus: "open",
    feeType: "free",
    reach: 0,
    org: "UNSTOP",
    orgSub: "Unstop",
    date: "30 November 2025",
    participants: "2 - 3",
    regOpens: "24 November 2025",
    regCloses: "01 January 2026",
  },
  {
    id: 2,
    title: "Tata Imagination Challenge 2025",
    image: "/images/events02.png",
    cta: "Visit",
    mode: "online",
    registrationStatus: "open",
    feeType: "free",
    reach: 0,
    org: "UNSTOP",
    orgSub: "Unstop",
    date: "30 January 2026",
    participants: "1 - 3",
    regOpens: "29 November 2025",
    regCloses: "15 January 2026",
  },
  {
    id: 3,
    title: "TCS NQT Foundation Round",
    image: "/images/events03.png",
    cta: "Visit",
    mode: "offline",
    registrationStatus: "closed",
    feeType: "paid",
    reach: 0,
    org: "UNSTOP",
    orgSub: "Unstop",
    date: "20 October 2025",
    participants: "1 - 4",
    regOpens: "13 September 2025",
    regCloses: "15 October 2025",
  },
  {
    id: 4,
    title: "Hackverse National Hackathon",
    image: "/images/events04.png",
    cta: "Visit",
    mode: "online",
    registrationStatus: "open",
    feeType: "paid",
    reach: 0,
    org: "UNSTOP",
    orgSub: "Unstop",
    date: "15 December 2025",
    participants: "2 - 3",
    regOpens: "15 November 2025",
    regCloses: "01 December 2025",
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
    query.trim() ? e.title.toLowerCase().includes(query.toLowerCase()) : false
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
                <p className="text-sm font-medium text-slate-900">{ev.title}</p>
                <p className="text-[11px] text-slate-500">UNSTOP · Unstop</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured section (carousel) */}
      <section className="mb-10">
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

      {/* All events header + filters bar */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            <span className="border-b-4 border-[#f7a900] pb-1">All</span> Events
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full bg-slate-700 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-slate-800 transition"
            >
              Clear Filters
            </button>

            <div className="relative">
              <button
                onClick={() => setShowFilterPanel((prev) => !prev)}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Filter
                <span
                  className={`text-[10px] transition-transform duration-200 ${
                    showFilterPanel ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <MdOutlineKeyboardArrowDown className="text-xl" />
                </span>
              </button>

              {showFilterPanel && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.16)] border border-slate-200 z-30 p-4 space-y-3 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Event Mode
                    </label>
                    <select
                      value={filters.mode}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, mode: e.target.value }))
                      }
                      className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm text-slate-700 bg-white"
                    >
                      <option value="all">All</option>
                      <option value="online">Online</option>
                      <option value="offline">Onsite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Registration Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, status: e.target.value }))
                      }
                      className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm text-slate-700 bg-white"
                    >
                      <option value="all">All</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Fee
                    </label>
                    <select
                      value={filters.fee}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, fee: e.target.value }))
                      }
                      className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-sm text-slate-700 bg-white"
                    >
                      <option value="all">All</option>
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  <button
                    onClick={applyFilters}
                    className="w-full mt-1 rounded-full bg-[#f59e0b] text-white text-xs sm:text-sm font-semibold py-2 hover:bg-[#f97316] transition"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All events grid with rich cards */}
        {filteredAll.length === 0 ? (
          <p className="text-sm text-slate-500">
            No events found for the selected filters.
          </p>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAll.map((event) => (
              <motion.div
                variants={cardVariants}
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 pt-4 pb-3 flex flex-col justify-between"
              >
                {/* top meta row */}
                <div className="flex items-center justify-between mb-2 text-[11px] text-slate-400">
                  <span>↗ Reach {event.reach}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        event.registrationStatus === "open"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {event.registrationStatus === "open" ? "Live" : "Closed"}
                    </span>
                    <button className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                      ♡
                    </button>
                  </div>
                </div>

                {/* title + org */}
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600">{event.org}</p>
                  <p className="text-[11px] text-slate-400">{event.orgSub}</p>
                </div>

                {/* info rows */}
                <div className="space-y-1.5 text-xs sm:text-[13px] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 text-sm">●</span>
                    <span
                      className={
                        event.mode === "online"
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }
                    >
                      {event.mode === "online" ? "Online" : "Onsite"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <LuCalendarDays className="text-indigo-500" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <LuUsers className="text-purple-500" />
                    <span>Participants: {event.participants}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <PiGlobeHemisphereWestLight className="text-sky-500" />
                    <span className="capitalize">{event.mode}</span>
                  </div>
                </div>

                {/* buttons row */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <Link
                    to={`/events/${event.id}`}
                    className="flex-1 inline-flex items-center justify-center rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold py-2 hover:bg-slate-800 transition"
                  >
                    Get Detail
                  </Link>

                  <span
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border whitespace-nowrap ${
                      event.feeType === "free"
                        ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                        : "border-amber-500 text-amber-600 bg-amber-50"
                    }`}
                  >
                    {event.feeType === "free" ? "FREE" : "₹ 150"}
                  </span>
                </div>

                {/* registration dates */}
                <div className="mt-3 border-t border-slate-100 pt-2 text-[11px] leading-snug">
                  <p className="text-slate-400">
                    Registration Opens: {event.regOpens}
                  </p>
                  <p className="text-rose-500">
                    closing on : {event.regCloses}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Events;
