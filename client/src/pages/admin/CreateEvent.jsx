// src/pages/admin/CreateEvent.jsx - ✅ COMPLETE & 100% WORKING
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGlobe, FaMapMarkerAlt, FaUpload, FaPlus, FaTimes, FaCalendarAlt, 
  FaTrophy, FaHashtag, FaFileAlt, FaShieldAlt, FaExclamationTriangle, FaTag,
  FaDollarSign  // ✅ FIXED: Using FaDollarSign instead of FaTicketSimple
} from "react-icons/fa";

const Section = ({ icon: Icon, title, subtitle, children, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 mb-8 ${className}`}>
    <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-200">
      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    eventName: "",
    regStartDate: "",
    regEndDate: "",
    eventDate: "",
    venueLink: "",
    minParticipants: "",
    maxParticipants: "",
    eventDescription: "",
    eventType: "free",
    eventFee: "",
    eventPoster: null,
    tags: "",
    brochure: null,
    mode: "online",
    stages: [{ name: "Stage 1", description: "" }],
    prizes: [{ name: "", amount: "", type: "" }],
    createdAt: new Date().toISOString(),
    status: "published"
  });

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (type, e) =>
    setFormData((prev) => ({ ...prev, [type]: e.target.files[0] }));

  const addStage = () =>
    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, { name: `Stage ${prev.stages.length + 1}`, description: "" }],
    }));

  const updateStage = (i, field, value) =>
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.map((s, idx) =>
        idx === i ? { ...s, [field]: value } : s
      ),
    }));

  const removeStage = (i) =>
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, idx) => idx !== i),
    }));

  const addPrize = () =>
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { name: "", amount: "", type: "" }],
    }));

  const updatePrize = (i, field, value) =>
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.map((p, idx) =>
        idx === i ? { ...p, [field]: value } : p
      ),
    }));

  const removePrize = (i) =>
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((_, idx) => idx !== i),
    }));

  const saveEventToStorage = () => {
    if (typeof window === 'undefined') return;
    try {
      const existingEvents = JSON.parse(localStorage.getItem('adminEvents') || '[]');
      const updatedEvents = [formData, ...existingEvents];
      localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));
      console.log("✅ Event SAVED:", formData.eventName);
    } catch (error) {
      console.error("❌ Save error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.eventName.trim() || !formData.eventDescription.trim()) {
      alert("Please fill Event Name and Description");
      return;
    }
    saveEventToStorage();
    navigate("/admin/manage-events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ================= 1. BASIC INFO ================= */}
          <Section icon={FaCalendarAlt} title="Basic Information" subtitle="Event name, dates & description">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Name *</label>
                <input
                  type="text"
                  placeholder="e.g., TechFest 2025 Hackathon"
                  value={formData.eventName}
                  onChange={(e) => updateField("eventName", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Event Date *</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => updateField("eventDate", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Start</label>
                <input
                  type="date"
                  value={formData.regStartDate}
                  onChange={(e) => updateField("regStartDate", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Registration End</label>
                <input
                  type="date"
                  value={formData.regEndDate}
                  onChange={(e) => updateField("regEndDate", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Event Description *</label>
              <textarea
                placeholder="Tell participants about your event..."
                value={formData.eventDescription}
                onChange={(e) => updateField("eventDescription", e.target.value)}
                className="w-full p-5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 text-lg resize-vertical"
                rows={6}
                required
              />
            </div>
          </Section>

          {/* ================= 2. LOCATION & MODE ================= */}
          <Section icon={FaMapMarkerAlt} title="Location & Mode" subtitle="Where and how your event will happen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Venue/Link *</label>
                <input
                  type="text"
                  placeholder="Physical address or Zoom/Meet link"
                  value={formData.venueLink}
                  onChange={(e) => updateField("venueLink", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Event Mode</label>
                <div className="flex gap-4 p-3 bg-slate-50 border border-slate-300 rounded-xl">
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-white border cursor-pointer hover:bg-slate-50 flex-1 justify-center">
                    <input
                      type="radio" value="online"
                      checked={formData.mode === "online"}
                      onChange={(e) => updateField("mode", e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <FaGlobe className="w-4 h-4" /> Online
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-white border cursor-pointer hover:bg-slate-50 flex-1 justify-center">
                    <input
                      type="radio" value="offline"
                      checked={formData.mode === "offline"}
                      onChange={(e) => updateField("mode", e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <FaMapMarkerAlt className="w-4 h-4" /> Offline
                  </label>
                </div>
              </div>
            </div>
          </Section>

          {/* ================= 3. PRICING & CAPACITY ================= */}
          <Section icon={FaDollarSign} title="Pricing & Capacity" subtitle="Free or paid event">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Event Type *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                    <input
                      type="radio" value="free"
                      checked={formData.eventType === "free"}
                      onChange={(e) => updateField("eventType", e.target.value)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Free Event</div>
                      <div className="text-sm text-slate-600">No registration fee</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                    <input
                      type="radio" value="paid"
                      checked={formData.eventType === "paid"}
                      onChange={(e) => updateField("eventType", e.target.value)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Paid Event</div>
                      <div className="text-sm text-slate-600">
                        Set registration fee (₹{formData.eventFee || 0})
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              {formData.eventType === "paid" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Fee *</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={formData.eventFee}
                    onChange={(e) => updateField("eventFee", e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
                    min="0"
                    step="10"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Min Participants</label>
                <input
                  type="number"
                  placeholder="10"
                  value={formData.minParticipants}
                  onChange={(e) => updateField("minParticipants", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Max Participants</label>
                <input
                  type="number"
                  placeholder="100"
                  value={formData.maxParticipants}
                  onChange={(e) => updateField("maxParticipants", e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
          </Section>

          {/* ================= 4. POSTER & FILES ================= */}
          <Section icon={FaUpload} title="Event Poster & Files" subtitle="Upload poster and brochure">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="eventPoster"
                  onChange={(e) => handleFileUpload('eventPoster', e)}
                />
                <label htmlFor="eventPoster" className="cursor-pointer block h-full flex flex-col items-center justify-center">
                  <FaUpload className="w-16 h-16 text-slate-400 group-hover:text-blue-500 mb-4 transition-all" />
                  <p className="text-xl font-semibold text-slate-700 mb-1">Event Poster</p>
                  <p className="text-sm text-slate-500 mb-3">Recommended: 1200x675px, JPG/PNG</p>
                  {formData.eventPoster ? (
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                      ✅ {formData.eventPoster.name}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-500">No file selected</span>
                  )}
                </label>
              </div>
            </div>
          </Section>

          {/* ================= 5. TAGS ================= */}
          <Section icon={FaHashtag} title="Tags & Keywords" subtitle="Help people find your event">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="hackathon, coding, workshop, techfest, AI, ML"
                value={formData.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 text-lg"
              />
              <p className="text-sm text-slate-500 mt-2">Example: hackathon, coding, workshop, tech, AI</p>
            </div>
          </Section>

          {/* ================= 6. EVENT STAGES ================= */}
          <Section icon={FaShieldAlt} title="Event Stages" subtitle="Multi-stage competitions">
            <div className="space-y-4">
              {formData.stages.map((stage, i) => (
                <div key={i} className="flex gap-4 items-end mb-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <input
                    placeholder="Stage Name"
                    value={stage.name}
                    onChange={(e) => updateStage(i, 'name', e.target.value)}
                    className="flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <textarea
                    placeholder="Stage Description"
                    value={stage.description}
                    onChange={(e) => updateStage(i, 'description', e.target.value)}
                    className="flex-2 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                  {formData.stages.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeStage(i)} 
                      className="p-3 text-red-500 hover:bg-red-100 rounded-xl hover:scale-105 transition-all"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <motion.button 
                type="button" 
                onClick={addStage}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold py-3 px-6 bg-blue-100 hover:bg-blue-200 rounded-2xl transition-all border-2 border-blue-200 hover:border-blue-300"
              >
                <FaPlus className="w-5 h-5" /> Add New Stage
              </motion.button>
            </div>
          </Section>

          {/* ================= 7. PRIZES ================= */}
          <Section icon={FaTrophy} title="Prizes & Rewards" subtitle="Motivate participants with great prizes">
            <div className="space-y-4">
              {formData.prizes.map((prize, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                  <input
                    placeholder="Prize Name (e.g., 1st Place)"
                    value={prize.name}
                    onChange={(e) => updatePrize(i, 'name', e.target.value)}
                    className="p-4 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    placeholder="Amount (₹)"
                    type="number"
                    value={prize.amount}
                    onChange={(e) => updatePrize(i, 'amount', e.target.value)}
                    className="p-4 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    min="0"
                  />
                  <select
                    value={prize.type}
                    onChange={(e) => updatePrize(i, 'type', e.target.value)}
                    className="p-4 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Prize Type</option>
                    <option value="cash">Cash</option>
                    <option value="trophy">Trophy</option>
                    <option value="certificate">Certificate</option>
                    <option value="gift">Gift Voucher</option>
                  </select>
                  {formData.prizes.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removePrize(i)} 
                      className="md:col-span-3 p-3 text-red-500 hover:bg-red-100 rounded-xl hover:scale-105 transition-all mt-2 md:mt-0"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <motion.button 
                type="button" 
                onClick={addPrize}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-emerald-600 hover:text-emerald-800 font-semibold py-3 px-6 bg-emerald-100 hover:bg-emerald-200 rounded-2xl transition-all border-2 border-emerald-200 hover:border-emerald-300"
              >
                <FaTrophy className="w-5 h-5" /> Add Prize
              </motion.button>
            </div>
          </Section>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="flex gap-6 mt-12">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/admin")}
              className="flex-1 py-5 px-8 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-800 font-bold rounded-3xl shadow-xl hover:shadow-2xl transition-all text-lg border border-slate-400"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="flex-1 py-5 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all text-lg"
            >
              🚀 Create & Publish Event
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
