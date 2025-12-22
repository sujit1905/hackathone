import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const clubs = [
  {
    id: 1,
    name: "UNSTOP - UNSTOP",
    org: "Unstop",
    city: "Pune",
    type: "limited_company",
    logo: "/images/clubs/unstopp.png", // change paths to your logos
    eventsCount: 5,
  },
  {
    id: 2,
    name: "SOFTA - Students' Organisation For Technical Activities",
    org: "Walchand College Of Engineering, Sangli",
    city: "Sangli",
    type: "college_club",
    logo: "/images/clubs/softa.png",
    eventsCount: 1,
  },
  {
    id: 3,
    name: "WLUG - Walchand Linux User's Group",
    org: "Walchand College Of Engineering, Sangli",
    city: "Sangli",
    type: "college_club",
    logo: "/images/clubs/wlug.png",
    eventsCount: 1,
  },
];

const Clubs = () => {
  const [query, setQuery] = useState("");

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pb-12">
      {/* Search bar */}
      <div className="mt-4 mb-6">
        <div className="w-full rounded-full bg-[#f3f4f6] px-6 py-3 flex items-center gap-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <CiSearch className="text-2xl text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for club, college"
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
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#fbbf24] text-slate-900 text-lg">
            <CiSearch />
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {filtered.length} Organizations Found
        </p>
      </div>

      {/* All Organizations header */}
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
        <span className="border-b-4 border-[#f7a900] pb-1">All</span>{" "}
        Organizations
      </h2>

      {/* Club cards */}
      <div className="space-y-4">
        {filtered.map((club) => (
          <div
            key={club.id}
            className="bg-[#e5f0ff] rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch px-5 py-4 gap-4"
          >
            {/* Logo */}
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src={club.logo}
                  alt={club.name}
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {club.name}
                </h3>
                <p className="text-sm text-slate-600">{club.org}</p>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineLocationMarker className="text-slate-400" />
                    {club.city}
                  </span>
                  <span>•</span>
                  <span>{club.type}</span>
                </div>
              </div>

              {/* View all events button */}
              <div className="mt-4">
                <button className="w-full md:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-semibold flex items-center justify-center gap-2">
                  <FaEye className="text-sm" />
                  <span>View All Events</span>
                  <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-xs">
                    {club.eventsCount}
                  </span>
                  <span className="text-xs">↗</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">
            No organizations match your search yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Clubs;
