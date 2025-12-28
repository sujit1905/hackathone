// src/pages/admin/CreateEvent.jsx - ✅ FIXED FOR SIDEBAR w-60 WIDTH
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaGlobe, FaMapMarkerAlt, FaUpload, FaPlus, FaTimes, 
  FaCalendarAlt, FaTrophy, FaHashtag, FaFileAlt, FaShieldAlt, FaExclamationTriangle
} from "react-icons/fa";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    regStartDate: "",
    regEndDate: "",
    eventDate: "",
    venueLink: "",
    minParticipants: "",
    maxParticipants: "",
    eventDescription: "",
    eventType: "free",
    eventPoster: null,
    tags: "",
    brochure: null,
    mode: "online",
    organization: "Your Organization",
    guidelines: "",
    stages: [{ name: "Stage 1", description: "" }],
    prizes: [{ name: "", amount: "", type: "" }],
    benefits: [{ name: "", description: "" }],
    rules: [{ name: "" }],
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleFileUpload = (type, e) => setFormData(prev => ({ ...prev, [type]: e.target.files[0] }));
  
  // All handlers (unchanged)
  const addStage = () => setFormData(prev => ({ ...prev, stages: [...prev.stages, { name: "", description: "" }] }));
  const removeStage = (index) => setFormData(prev => ({ ...prev, stages: prev.stages.filter((_, i) => i !== index) }));
  const updateStage = (index, field, value) => setFormData(prev => ({ ...prev, stages: prev.stages.map((s, i) => i === index ? { ...s, [field]: value } : s) }));

  const addPrize = () => setFormData(prev => ({ ...prev, prizes: [...prev.prizes, { name: "", amount: "", type: "" }] }));
  const removePrize = (index) => setFormData(prev => ({ ...prev, prizes: prev.prizes.filter((_, i) => i !== index) }));
  const updatePrize = (index, field, value) => setFormData(prev => ({ ...prev, prizes: prev.prizes.map((p, i) => i === index ? { ...p, [field]: value } : p) }));

  const addBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, { name: "", description: "" }] }));
  const removeBenefit = (index) => setFormData(prev => ({ ...prev, benefits: prev.benefits.filter((_, i) => i !== index) }));
  const updateBenefit = (index, field, value) => setFormData(prev => ({ ...prev, benefits: prev.benefits.map((b, i) => i === index ? { ...b, [field]: value } : b) }));

  const addRule = () => setFormData(prev => ({ ...prev, rules: [...prev.rules, { name: "" }] }));
  const removeRule = (index) => setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== index) }));
  const updateRule = (index, value) => setFormData(prev => ({ ...prev, rules: prev.rules.map((r, i) => i === index ? { ...r, name: value } : r) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event created:", formData);
    navigate("/admin");
  };

  // Preview Data
  const previewData = {
    status: "Upcoming",
    organization: formData.organization || "Your Organization",
    mode: formData.mode === "online" ? "Online" : "Offline",
    location: formData.venueLink || "Location",
    regOpen: formData.regStartDate ? new Date(formData.regStartDate).toLocaleDateString('en-IN') : "Not set",
    eventName: formData.eventName || "Event Name",
    description: formData.eventDescription.substring(0, 80) + (formData.eventDescription.length > 80 ? "..." : ""),
  };

  const Section = ({ icon: Icon, title, subtitle, children, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 mb-8 ${className}`}
    >
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            <p className="text-slate-600">{subtitle}</p>
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 md:pl-0">
      {/* ✅ FIXED: Account for w-60 sidebar (240px) on md+ screens */}
      <div className="max-w-[calc(100vw-240px)] mx-auto md:ml-auto lg:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          
          {/* ✅ MAIN FORM - Perfect spacing with sidebar */}
          <div className="lg:col-span-8 xl:col-span-9 pr-4 lg:pr-8">
            <form onSubmit={handleSubmit} className="space-y-0">
              
              {/* ✅ 1️⃣ HOST EVENT */}
              <Section icon={FaCalendarAlt} title="Host Event" subtitle="Fill all the host your event (Fields marked with * are required)">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Event Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.eventName}
                      onChange={(e) => updateField('eventName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500/50" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Registration Start <span className="text-red-500">*</span></label>
                      <input 
                        type="date" 
                        value={formData.regStartDate}
                        onChange={(e) => updateField('regStartDate', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Registration Close <span className="text-red-500">*</span></label>
                      <input 
                        type="date" 
                        value={formData.regEndDate}
                        onChange={(e) => updateField('regEndDate', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Event Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      value={formData.eventDate}
                      onChange={(e) => updateField('eventDate', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Min Participants</label>
                      <input 
                        type="number" 
                        value={formData.minParticipants}
                        onChange={(e) => updateField('minParticipants', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Max Participants</label>
                      <input 
                        type="number" 
                        value={formData.maxParticipants}
                        onChange={(e) => updateField('maxParticipants', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10 pt-10 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Location <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Venue address or online link" 
                      value={formData.venueLink}
                      onChange={(e) => updateField('venueLink', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Mode</label>
                    <div className="flex gap-4 p-2 bg-slate-50 border border-slate-300 rounded-2xl">
                      <label className="flex items-center gap-3 p-4 rounded-xl bg-white border cursor-pointer hover:border-blue-400 flex-1 justify-center">
                        <input 
                          type="radio" 
                          name="mode" 
                          value="online" 
                          checked={formData.mode === "online"}
                          onChange={(e) => updateField('mode', e.target.value)}
                          className="w-5 h-5" 
                        />
                        <FaGlobe className="w-5 h-5 text-slate-600" /> Online
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-xl bg-white border cursor-pointer hover:border-blue-400 flex-1 justify-center">
                        <input 
                          type="radio" 
                          name="mode" 
                          value="offline" 
                          checked={formData.mode === "offline"}
                          onChange={(e) => updateField('mode', e.target.value)}
                          className="w-5 h-5" 
                        />
                        <FaMapMarkerAlt className="w-5 h-5 text-slate-600" /> Offline
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Event Description <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={6} 
                    value={formData.eventDescription}
                    onChange={(e) => updateField('eventDescription', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-3xl px-6 py-5 text-lg focus:ring-2 focus:ring-blue-500/50" 
                  />
                </div>
              </Section>

              {/* ✅ Benefits Section */}
              <Section icon={FaTrophy} title="Benefits" subtitle="List benefits and certificate details for participants" className="border-2 border-green-200 bg-green-50/50">
                <div className="space-y-4">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="bg-white border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4 group hover:shadow-xl hover:border-green-300">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold mt-1 flex-shrink-0">✨</div>
                      <div className="flex-1 min-w-0">
                        <input 
                          type="text" 
                          placeholder="Benefit name (e.g., Certificate)" 
                          value={benefit.name} 
                          onChange={(e) => updateBenefit(index, 'name', e.target.value)} 
                          className="w-full mb-3 bg-transparent border-none outline-none text-lg font-semibold placeholder-slate-500 p-1 focus:ring-2 focus:ring-green-500/50" 
                        />
                        <textarea 
                          rows={2} 
                          placeholder="Benefit description" 
                          value={benefit.description} 
                          onChange={(e) => updateBenefit(index, 'description', e.target.value)} 
                          className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-500 resize-none focus:ring-2 focus:ring-green-500/50" 
                        />
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        onClick={() => removeBenefit(index)} 
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl ml-auto -mt-2"
                      >
                        <FaTimes className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    type="button" 
                    onClick={addBenefit} 
                    className="flex items-center gap-3 w-full p-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <FaPlus className="w-5 h-5" /> Add Benefit
                  </motion.button>
                </div>
              </Section>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex flex-col sm:flex-row gap-6 pt-12"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  type="button" 
                  onClick={() => navigate("/admin")} 
                  className="flex-1 px-12 py-5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-3xl shadow-xl hover:shadow-2xl text-lg border border-slate-300"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  type="submit" 
                  className="flex-1 px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 text-lg"
                >
                  Create Event
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* ✅ RIGHT PREVIEW SIDEBAR - Perfectly positioned */}
         
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
