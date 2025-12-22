// src/pages/EventDetails.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";

// TEMP: mock data – later you can fetch by id from API
const mockEvents = {
  1: {
    id: 1,
    title: "Aditya Birla Group Engenuity 2025",
    banner: "/images/events01.png",
    date: "30 Nov 2025",
    participants: "2 to 3",
    mode: "Online",
    organization: "UNSTOP",
    feeType: "FREE",
  },
  2: {
    id: 2,
    title: "Tata Imagination Challenge 2025",
    banner: "/images/events02.png",
    date: "30 Jan 2026",
    participants: "1 to 3",
    mode: "Online",
    organization: "UNSTOP",
    feeType: "FREE",
  },
  3: {
    id: 3,
    title: "TCS NQT Foundation Round",
    banner: "/images/events03.png",
    date: "15 Dec 2025",
    participants: "2 to 4",
    mode: "Online",
    organization: "UNSTOP",
    feeType: "PAID",
  },
  4: {
    id: 4,
    title: "Hackverse National Hackathon",
    banner: "/images/events04.png",
    date: "30 Nov 2025",
    participants: "2 to 3",
    mode: "Online",
    organization: "UNSTOP",
    feeType: "FREE",
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents[id] || mockEvents[1];

  const [activeSection, setActiveSection] = useState("overview");

  const scrollToId = (sectionId, key) => {
    setActiveSection(key);
    const el = document.getElementById(sectionId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="pb-12">
      {/* Hero */}
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-[#2f54eb] via-[#722ed1] to-[#eb2f96] px-6 py-6 md:px-10 md:py-8 text-white flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-[420px] rounded-2xl overflow-hidden bg-black/10">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {event.title}
            </h1>

            {/* Live + FREE badges */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-xs font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-100"></span>
              </span>
              Live
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              {event.feeType}
            </span>
          </div>

          <p className="text-sm text-white/80">UNSTOP - Unstop</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-white/60 text-xs uppercase tracking-wide">
                Event Date
              </p>
              <p className="font-semibold">{event.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/60 text-xs uppercase tracking-wide">
                Participants
              </p>
              <p className="font-semibold">{event.participants}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/60 text-xs uppercase tracking-wide">
                Mode
              </p>
              <p className="font-semibold">{event.mode}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/60 text-xs uppercase tracking-wide">
                Organization
              </p>
              <p className="font-semibold">{event.organization}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#40a9ff] text-sm font-semibold shadow-md hover:bg-[#1890ff]">
              ▶ Register on organizer&apos;s website
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white/90 text-slate-800 text-sm font-semibold">
              💬 My Queries
            </button>
          </div>
        </div>
      </section>

      {/* Two-column body */}
      <div className="grid gap-6 lg:grid-cols-[260px,1fr] items-start">
        {/* Left section tabs (sticky with active state) */}
        <aside className="sticky top-28 rounded-3xl bg-gradient-to-b from-[#597ef7] via-[#9254de] to-[#f759ab] p-4 text-sm text-white">
          <h2 className="text-lg font-semibold mb-3">Event Sections</h2>
          <div className="space-y-2">
            <button
              onClick={() => scrollToId("section-overview", "overview")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${
                activeSection === "overview"
                  ? "bg-white text-slate-800 font-medium"
                  : "bg-transparent text-white"
              }`}
            >
              <span>ⓘ</span>
              <span>Overview</span>
            </button>

            <button
              onClick={() => scrollToId("section-stages", "stages")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${
                activeSection === "stages"
                  ? "bg-white text-slate-800 font-medium"
                  : "bg-transparent text-white"
              }`}
            >
              <span>◎</span>
              <span>Event Stages</span>
            </button>

            <button
              onClick={() => scrollToId("section-prizes", "prizes")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${
                activeSection === "prizes"
                  ? "bg-[#e5f0ff] text-slate-900 font-medium"
                  : "bg-transparent text-white"
              }`}
            >
              <span>🏆</span>
              <span>Prizes &amp; Rewards</span>
            </button>

            <button
              onClick={() => scrollToId("section-timeline", "timeline")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 ${
                activeSection === "timeline"
                  ? "bg-white text-slate-800 font-medium"
                  : "bg-transparent text-white"
              }`}
            >
              <span>📅</span>
              <span>Timeline</span>
            </button>
          </div>
        </aside>

        {/* Right content */}
        <div className="space-y-6">
          {/* About */}
          <section
            id="section-overview"
            className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              About This Event
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Welcome to Mobility X, Aptiv&apos;s marquee ideathon, where
              you&apos;re invited to redefine the future of accessible urban
              mobility. This is your chance to spark breakthrough innovations
              using advanced mobility and connected technologies while learning
              from industry leaders.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
              <div className="rounded-2xl bg-[#eff6ff] p-4 space-y-1">
                <p className="text-xs font-semibold text-slate-700">
                  📅 Important Dates
                </p>
                <p className="text-slate-600">Registration Start: 24/11/2025</p>
                <p className="text-slate-600">Registration Closes: 1/1/2026</p>
                <p className="text-slate-600">Posted On: 24/11/2025</p>
              </div>
              <div className="rounded-2xl bg-[#f6ffed] p-4 space-y-1">
                <p className="text-xs font-semibold text-slate-700">
                  📍 Event Details
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>Location:</span> <span>Online</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>Mode:</span> <span>{event.mode}</span>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>Organization:</span> <span>{event.organization}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Stages */}
          <section
            id="section-stages"
            className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Event Stages
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex gap-3">
                <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Webinar: Inside MobilityX - Your Guide to Building a Complete
                    Idea Submission
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Unlock exclusive insights into MobilityX from senior leaders
                    and discover how to craft a pitch that rises above the
                    competition.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex gap-3">
                <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Round 1: Concept &amp; Feasibility Deck
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Teams submit an 8–10 slide presentation showcasing
                    feasibility, innovation and impact of their proposed
                    solutions in accessible mobility.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Prizes */}
          <section
            id="section-prizes"
            className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Prizes &amp; Rewards
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#fff7e6] p-5 text-center">
                <p className="text-3xl mb-2">🏆</p>
                <p className="font-semibold text-slate-900">Winner</p>
                <p className="text-lg font-bold text-slate-900 mt-1">75,000</p>
              </div>
              <div className="rounded-2xl bg-[#fff7e6] p-5 text-center">
                <p className="text-3xl mb-2">🏆</p>
                <p className="font-semibold text-slate-900">1st Runners Up</p>
                <p className="text-lg font-bold text-slate-900 mt-1">50,000</p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section
            id="section-timeline"
            className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Event Timeline
            </h2>

            <div className="grid md:grid-cols-[260px,1fr] gap-6">
              <div className="rounded-3xl bg-gradient-to-b from-[#597ef7] via-[#9254de] to-[#f759ab] p-4 text-white">
                <h3 className="text-lg font-semibold mb-3">
                  Event Sections
                </h3>
                <p className="text-xs text-white/80">
                  Overview, stages, rewards and complete event schedule at one
                  place.
                </p>
              </div>

              <div className="relative pl-6 border-l border-slate-200 space-y-6">
                <div className="relative">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-sky-500"></span>
                  <div className="ml-2 rounded-2xl bg-[#e6f4ff] p-4">
                    <p className="font-semibold text-slate-900 text-sm">
                      Registration Opens
                    </p>
                    <p className="text-xs text-slate-600 mt-1">24/11/2025</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Event registration begins
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-emerald-500"></span>
                  <div className="ml-2 rounded-2xl bg-[#e6fffb] p-4">
                    <p className="font-semibold text-slate-900 text-sm">
                      Registration Closes
                    </p>
                    <p className="text-xs text-slate-600 mt-1">1/1/2026</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Last date to register
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-orange-500"></span>
                  <div className="ml-2 rounded-2xl bg-[#fff7e6] p-4">
                    <p className="font-semibold text-slate-900 text-sm">
                      Event Day
                    </p>
                    <p className="text-xs text-slate-600 mt-1">30/11/2025</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Main event takes place
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-purple-500"></span>
                  <div className="ml-2 rounded-2xl bg-[#f9f0ff] p-4">
                    <p className="font-semibold text-slate-900 text-sm">
                      Results Announcement
                    </p>
                    <p className="text-xs text-slate-600 mt-1">TBD</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Winners will be announced
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
