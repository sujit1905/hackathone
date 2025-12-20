import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import { useAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchEvent = async () => {
    setLoading(true);
    const { data } = await api.get(`/api/events/${id}`);
    setEvent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) return;
    const res = await api.post(`/api/events/${id}/register`);
    setStatusMsg(res.data.message);
    fetchEvent();
  };

  const handleBookmark = async () => {
    if (!user) return;
    const res = await api.post(`/api/events/${id}/bookmark`);
    setStatusMsg(res.data.message);
    fetchEvent();
  };

  if (loading || !event) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-36" />
      </div>
    );
  }

  const isRegistered = user
    ? event.registeredUsers?.includes(user._id)
    : false;

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-semibold mb-1">
              {event.title}
            </h1>
            <p className="text-sm text-slate-400">
              Organized by{" "}
              <span className="text-sky-300">
                {event.createdBy?.name || "Club"}
              </span>
            </p>
          </div>
          <span className="text-[11px] px-3 py-1 h-fit rounded-full bg-slate-800/80 text-sky-300 border border-slate-700">
            {event.category}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs mb-4">
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 px-3 py-2">
            <p className="text-slate-400">Date & time</p>
            <p className="mt-1">
              {new Date(event.date).toLocaleDateString()} ·{" "}
              {event.time}
            </p>
          </div>
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 px-3 py-2">
            <p className="text-slate-400">Venue</p>
            <p className="mt-1">{event.venue}</p>
          </div>
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 px-3 py-2">
            <p className="text-slate-400">Registrations</p>
            <p className="mt-1">
              {event.registeredUsers?.length || 0} students
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mb-4">
          {event.description}
        </p>

        {statusMsg && (
          <p className="text-xs text-emerald-400 mb-3">
            {statusMsg}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleRegister}
            disabled={!user || isRegistered}
          >
            {isRegistered ? "Registered" : "Register"}
          </Button>
          <Button
            variant="ghost"
            onClick={handleBookmark}
            disabled={!user}
          >
            ☆ Bookmark
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventDetails;
