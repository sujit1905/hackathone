import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatCard from "../../components/ui/StatCard";
import Sidebar from "../../components/layout/Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Tech",
  });

  const fetchStats = async () => {
    setLoading(true);
    const { data } = await api.get("/api/events/admin/stats");
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/api/events", form);
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      category: "Tech",
    });
    fetchStats();
    setActiveSection("manage");
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/events/${id}`);
    fetchStats();
  };

  return (
    <div className="flex gap-0">
      {/* left sidebar */}
      <Sidebar />

      {/* main content */}
      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl font-semibold">Admin dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, manage and track all campus events for your club.
            </p>
          </div>

          {/* section tabs */}
          <div className="inline-flex rounded-full bg-slate-900/70 border border-slate-800 p-1 text-xs">
            {[
              { id: "overview", label: "Overview" },
              { id: "create", label: "Create event" },
              { id: "manage", label: "Manage events" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3 py-1 rounded-full transition ${
                  activeSection === tab.id
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-300 hover:text-emerald-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* content grid */}
        <div className="grid md:grid-cols-[1.2fr_1.5fr] gap-6">
          {/* left column: stats + create form (conditional) */}
          <div className="space-y-4">
            {/* stats always visible */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StatCard
                  label="Total events"
                  value={stats.totalEvents}
                  accent="bg-emerald-500/70"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StatCard
                  label="Total registrations"
                  value={stats.totalRegistrations}
                  accent="bg-lime-400/70"
                />
              </motion.div>
            </div>

            {/* create form only in create / overview */}
            {(activeSection === "create" ||
              activeSection === "overview") && (
              <Card className="p-4">
                <h2 className="text-sm font-semibold mb-3">
                  Create new event
                </h2>
                <form
                  onSubmit={handleCreate}
                  className="grid grid-cols-1 gap-3 text-xs"
                >
                  <input
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                  />
                  <textarea
                    placeholder="Description"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                    />
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <input
                    placeholder="Venue"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2 outline-none focus:border-emerald-500"
                  >
                    <option>Tech</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Workshop</option>
                  </select>
                  <Button type="submit" className="py-2 mt-1 text-xs">
                    Create event
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* right column: manage list (always, but emphasized in manage) */}
          <div>
            <h2 className="text-sm font-semibold mb-3">
              {activeSection === "manage"
                ? "Manage events"
                : "Recent events"}
            </h2>
            <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
              {loading ? (
                <p className="text-xs text-slate-400">
                  Loading events...
                </p>
              ) : stats.events.length === 0 ? (
                <p className="text-xs text-slate-400">
                  No events yet. Create your first event.
                </p>
              ) : (
                stats.events.map((event) => (
                  <Card
                    key={event._id}
                    className="p-4 flex justify-between items-start"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(
                          event.date
                        ).toLocaleDateString()}{" "}
                        · {event.time} · {event.venue}
                      </p>
                      <p className="text-[11px] text-emerald-400 mt-1">
                        {event.registeredUsers.length} registrations
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-[11px] px-2 py-1"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
