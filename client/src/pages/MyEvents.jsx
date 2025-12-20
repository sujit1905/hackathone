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
    setLoading(true);
    const { data } = await api.get("/api/events/user/me");
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const current =
    activeTab === "registered"
      ? data.registered
      : data.bookmarked;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My events</h1>

      <div className="inline-flex mb-5 rounded-full bg-slate-900/70 border border-slate-800 p-1">
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
            {tab === "registered"
              ? "Registered"
              : "Bookmarked"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : current.length === 0 ? (
        <p className="text-sm text-slate-400">
          Nothing here yet. Start exploring events on the home
          page.
        </p>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {current.map((event) => (
            <Card key={event._id} className="p-4">
              <h3 className="text-sm font-semibold mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                {event.description}
              </p>
              <p className="text-[11px] text-slate-400">
                📅{" "}
                {new Date(
                  event.date
                ).toLocaleDateString()}{" "}
                · {event.time}
              </p>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyEvents;
