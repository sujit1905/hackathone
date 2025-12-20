import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    status: "upcoming",
    search: "",
  });

  const fetchEvents = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.category !== "all")
      params.append("category", filters.category);
    if (filters.status) params.append("status", filters.status);
    if (filters.search) params.append("search", filters.search);
    const { data } = await api.get(
      `/api/events?${params.toString()}`
    );
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [filters.category, filters.status, filters.search]);

  const handleBookmark = async (id) => {
    if (!user) return;
    await api.post(`/api/events/${id}/bookmark`);
    fetchEvents();
  };

  const handleRegister = async (id) => {
    if (!user) return;
    await api.post(`/api/events/${id}/register`);
    fetchEvents();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            All college events, one{" "}
            <span className="text-sky-400">platform</span>.
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover upcoming fests, workshops, hackathons, and
            more.
          </p>
        </div>

        <motion.div
          className="relative w-full sm:w-72"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            placeholder="Search events..."
            className="w-full rounded-full bg-slate-900/60 border border-slate-700 px-4 py-2 pl-10 text-sm outline-none focus:border-sky-500 transition"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
          <span className="absolute left-3 top-2.5 text-xs text-slate-500">
            🔍
          </span>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        <button
          onClick={() =>
            setFilters({ ...filters, status: "upcoming" })
          }
          className={`px-3 py-1 rounded-full border ${
            filters.status === "upcoming"
              ? "border-sky-500 bg-sky-500/10 text-sky-300"
              : "border-slate-700 text-slate-300"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() =>
            setFilters({ ...filters, status: "past" })
          }
          className={`px-3 py-1 rounded-full border ${
            filters.status === "past"
              ? "border-sky-500 bg-sky-500/10 text-sky-300"
              : "border-slate-700 text-slate-300"
          }`}
        >
          Past
        </button>

        {["all", "Tech", "Cultural", "Sports", "Workshop"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() =>
                setFilters({ ...filters, category: cat })
              }
              className={`px-3 py-1 rounded-full border ${
                filters.category === cat
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-700 text-slate-300"
              }`}
            >
              {cat === "all" ? "All categories" : cat}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-sm">
            No events match these filters yet.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.04 },
            },
          }}
        >
          {events.map((event) => (
            <motion.div
              key={event._id}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="p-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">
                      {event.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 text-sky-300 border border-slate-700">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {event.description}
                  </p>
                  <div className="flex flex-col gap-1 text-[11px] text-slate-400">
                    <span>
                      📅{" "}
                      {new Date(
                        event.date
                      ).toLocaleDateString()}{" "}
                      · {event.time}
                    </span>
                    <span>📍 {event.venue}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/events/${event._id}`}
                    className="text-[11px] text-sky-300 hover:underline"
                  >
                    View details
                  </Link>
                  <div className="flex gap-2">
                    <Button
                      variant="subtle"
                      className="px-3 py-1 text-[11px]"
                      onClick={() => handleBookmark(event._id)}
                      disabled={!user}
                    >
                      ☆ Bookmark
                    </Button>
                    <Button
                      className="px-3 py-1 text-[11px]"
                      onClick={() => handleRegister(event._id)}
                      disabled={!user}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
