// src/pages/MyEvents.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";

const MyEvents = () => {
  const { user } = useAuth();

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
    // Only fetch if user is logged in
    if (user) {
      fetchMyEvents();
    } else {
      setLoading(false);
    }
  }, [user]);

  const current =
    activeTab === "registered" ? data.registered : data.bookmarked;

  const showEmpty = !loading && current.length === 0;

  // If not logged in, show login message with CTA
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
        {/* Main message card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 max-w-md w-full border border-white/50 shadow-2xl shadow-slate-200/50"
        >
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Log in to see your events
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Please sign in to view your registered and bookmarked events.
          </p>

          {/* Login CTA */}
          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto max-w-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In Now
            </Link>

            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 border-b border-slate-200 pb-4">
        My Events
      </h1>

      {/* Tabs */}
      <div className="inline-flex mb-8 rounded-full bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700 p-1 shadow-lg backdrop-blur-sm">
        {["registered", "bookmarked"].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab
                ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/25"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab === "registered" ? "📋 Registered" : "⭐ Bookmarked"}
          </motion.button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {showEmpty && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20 px-4"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-6l-3 3-3-3" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            {activeTab === "registered" ? "No registrations yet" : "No bookmarks yet"}
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-md">
            {activeTab === "registered" 
              ? "Register for events to see them here." 
              : "Bookmark events you like to save them for later."
            }
          </p>
          <Link
            to="/events"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Browse Events
          </Link>
        </motion.div>
      )}

      {/* Event cards */}
      {!loading && current.length > 0 && (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {current.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-xs font-semibold text-green-800">
                    {activeTab === "registered" ? "Registered" : "Bookmarked"}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>📅</span>
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>🕒</span>
                    <span>{event.time}</span>
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                    <span>📍</span>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyEvents;
