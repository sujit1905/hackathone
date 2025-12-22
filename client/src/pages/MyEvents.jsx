// src/pages/MyEvents.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";

const MyEvents = () => {
  const [data, setData] = useState({
    bookmarked: [],
    registered: [],
  });
  const [activeTab, setActiveTab] = useState("registered");
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/events/user/me");
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData({ bookmarked: [], registered: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const current =
    activeTab === "registered" ? data.registered : data.bookmarked;

  const showEmpty = !loading && current.length === 0;

  return (
    <div>
      {/* Title like the second screenshot */}
      <h1 className="text-3xl font-semibold mb-8 border-b border-slate-200 pb-4">
        My Registrations
      </h1>

      {/* Tabs */}
      <div className="inline-flex mb-8 rounded-full bg-slate-900/70 border border-slate-800 p-1">
        {["registered", "bookmarked"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-xs rounded-full transition ${
              activeTab === tab
                ? "bg-sky-500 text-slate-900"
                : "text-slate-300"
            }`}
          >
            {tab === "registered" ? "Registered" : "Bookmarked"}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {showEmpty && (
        <div className="h-64 flex items-center">
          <p className="text-lg text-slate-500">
            You haven't registered for any events yet.
          </p>
        </div>
      )}

      {/* Event cards */}
      {!loading && current.length > 0 && (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {current.map((event) => (
            <Card key={event._id} className="p-4">
              <h3 className="text-sm font-semibold mb-1">{event.title}</h3>
              <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                {event.description}
              </p>
              <p className="text-[11px] text-slate-400">
                📅 {new Date(event.date).toLocaleDateString()} · {event.time}
              </p>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyEvents;
