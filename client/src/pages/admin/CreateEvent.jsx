// src/pages/admin/CreateEvent.jsx - ✅ FULLY CONTROLLED WITH NEW SECTIONS + SIDEBAR
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
    stages: [{ name: "Stage 1", description: "" }],
    prizes: [{ name: "", amount: "", type: "" }],
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleFileUpload = (type, e) => setFormData(prev => ({ ...prev, [type]: e.target.files[0] }));
  
  const addStage = () => setFormData(prev => ({ ...prev, stages: [...prev.stages, { name: "", description: "" }] }));
  const removeStage = (index) => setFormData(prev => ({ ...prev, stages: prev.stages.filter((_, i) => i !== index) }));
  const updateStage = (index, field, value) => setFormData(prev => ({ ...prev, stages: prev.stages.map((s, i) => i === index ? { ...s, [field]: value } : s) }));

  const addPrize = () => setFormData(prev => ({ ...prev, prizes: [...prev.prizes, { name: "", amount: "", type: "" }] }));
  const removePrize = (index) => setFormData(prev => ({ ...prev, prizes: prev.prizes.filter((_, i) => i !== index) }));
  const updatePrize = (index, field, value) => setFormData(prev => ({ ...prev, prizes: prev.prizes.map((p, i) => i === index ? { ...p, [field]: value } : p) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event created:", formData);
    navigate("/admin");
  };

  // ✅ Event Preview Data - Dynamically generated from formData
  const previewData = {
    status: formData.eventType === "free" ? "Free Event" : "Paid Event",
    organization: "EventHub",
    mode: formData.mode === "online" ? "Online" : "Offline",
    regOpen: formData.regStartDate ? new Date(formData.regStartDate).toLocaleDateString('en-IN') : "TBD",
    eventName: formData.eventName || "Your Event Name",
    description: formData.eventDescription.substring(0, 100) + (formData.eventDescription.length > 100 ? "..." : ""),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-0">
          {/* ✅ MAIN CONTENT GRID - Adjusts when sidebar appears */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* ✅ LEFT MAIN FORM - Takes full width on mobile, 8/12 on desktop */}
            <div className="lg:col-span-8">
              
              {/* ✅ 1. Host Event - FULLY CONTROLLED */}
              <Section icon={FaCalendarAlt} title="Host Event" subtitle="Fill all the host your event (Fields marked with * are required)">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Event Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.eventName}
                      onChange={(e) => updateField('eventName', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500/50" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
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
                  <div className="grid grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 pt-10 border-t border-slate-200">
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

              {/* ✅ 2. Help people find your event - FULLY CONTROLLED */}
              <Section icon={FaHashtag} title="Help people find your event" subtitle="Add tags, brochure, workshop, tech etc">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-4">Event Tags (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="hackathon, coding, workshop" 
                      value={formData.tags}
                      onChange={(e) => updateField('tags', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-lg" 
                    />
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center hover:border-blue-400 transition-all bg-slate-50">
                    <input type="file" className="hidden" id="brochure" onChange={(e) => handleFileUpload('brochure', e)} />
                    <label htmlFor="brochure" className="cursor-pointer block w-full h-full flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        📎
                      </div>
                      <p className="text-lg font-semibold text-slate-700 mb-1">Upload Brochure</p>
                      <p className="text-sm text-slate-500">PDF, JPG, PNG (Max 5MB)</p>
                    </label>
                  </div>
                </div>
              </Section>

              {/* ✅ 3. Event & Payment Details - FULLY CONTROLLED */}
              <Section icon={FaFileAlt} title="Event & Payment Details" subtitle="Choose whether your event is free or paid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Event Type</label>
                    <select 
                      value={formData.eventType}
                      onChange={(e) => updateField('eventType', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="free">Free Event</option>
                      <option value="paid">Paid Event (₹150)</option>
                    </select>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center hover:border-blue-400 transition-all bg-slate-50">
                  <FaUpload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <label className="block text-lg font-semibold text-slate-700 mb-2 cursor-pointer hover:text-blue-600">
                    Event Poster (Recommended 1000x1000px)
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload('eventPoster', e)}
                    />
                  </label>
                  <p className="text-sm text-slate-500">{formData.eventPoster ? formData.eventPoster.name : "No file chosen"}</p>
                </div>
              </Section>

              {/* ✅ 4. Registration Platform */}
              <Section icon={FaCalendarAlt} title="Registration Platform" subtitle="Accept registrations on your app">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <FaCalendarAlt className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-blue-900 mb-3">Accept registrations on EventHub</h4>
                  <p className="text-lg text-blue-800 mb-6 max-w-2xl mx-auto">All registrations will be managed through your EventHub dashboard</p>
                  <div className="bg-white rounded-2xl px-6 py-4 border border-blue-200 inline-block shadow-sm">
                    <span className="text-sm font-semibold text-blue-900">✅ Enabled by default</span>
                  </div>
                </div>
              </Section>

              {/* ✅ 5. NEW Benefits Section - MATCHING UI */}
              <Section icon={FaTrophy} title="Benefits" subtitle="List benefits and certificate details for participants" className="border-2 border-green-200 bg-green-50/50">
                <div className="space-y-4">
                  {formData.stages.map((benefit, index) => (
                    <div key={index} className="bg-white border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4 group hover:shadow-xl hover:border-green-300 transition-all">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold mt-1 flex-shrink-0">
                        ✨
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          placeholder="Benefit name (e.g., Certificate)"
                          value={benefit.name}
                          onChange={(e) => updateStage(index, 'name', e.target.value)}
                          className="w-full mb-3 bg-transparent border-none outline-none text-lg font-semibold placeholder-slate-500 p-1 focus:ring-2 focus:ring-green-500/50"
                        />
                        <textarea
                          rows={2}
                          placeholder="Benefit description"
                          value={benefit.description}
                          onChange={(e) => updateStage(index, 'description', e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-500 resize-none focus:ring-2 focus:ring-green-500/50"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeStage(index)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all ml-auto -mt-2"
                      >
                        <FaTimes className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={addStage}
                    className="flex items-center gap-3 w-full p-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <FaPlus className="w-5 h-5" /> Add Benefit
                  </motion.button>
                </div>
              </Section>

              {/* ✅ 6. NEW Rules Section - MATCHING UI */}
              <Section icon={FaShieldAlt} title="Rules" subtitle="List rules for the event or contest" className="border-2 border-orange-200 bg-orange-50/50">
                <div className="space-y-4">
                  {formData.prizes.slice(0, 3).map((rule, index) => (  // Using prizes array temporarily for rules
                    <div key={index} className="bg-white border-2 border-orange-200 rounded-2xl p-6 flex items-start gap-4 group hover:shadow-xl hover:border-orange-300 transition-all">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold mt-1 flex-shrink-0">
                        📜
                      </div>
                      <div className="flex-1 min-w-0">
                        <textarea
                          rows={3}
                          placeholder={`Rule ${index + 1} (e.g., No plagiarism allowed)`}
                          value={rule.name}
                          onChange={(e) => updatePrize(index, 'name', e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-lg font-semibold placeholder-slate-500 p-2 focus:ring-2 focus:ring-orange-500/50 resize-none"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all ml-auto -mt-2"
                      >
                        <FaTimes className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={addPrize}
                    className="flex items-center gap-3 w-full p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <FaPlus className="w-5 h-5" /> Add Rule
                  </motion.button>
                </div>
              </Section>

              {/* ✅ 7. NEW Guidelines Section - MATCHING UI */}
              <Section icon={FaExclamationTriangle} title="Guidelines" subtitle="Provide general guidelines for participants" className="border-2 border-purple-200 bg-purple-50/50">
                <div className="space-y-4">
                  <div className="bg-white border-2 border-purple-200 rounded-2xl p-8">
                    <textarea
                      rows={8}
                      placeholder="General guidelines for participants (code of conduct)"
                      className="w-full bg-transparent border-none outline-none text-lg placeholder-slate-500 p-4 focus:ring-2 focus:ring-purple-500/50 resize-none"
                    />
                  </div>
                </div>
              </Section>

              {/* ✅ 8. Stages - FULLY CONTROLLED */}
              <Section icon={FaCalendarAlt} title="Stages" subtitle="Add your event rounds. Round 1, Round 2. Describe what happens in each stage">
                <div className="space-y-4">
                  {formData.stages.map((stage, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4 group hover:shadow-md">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold mt-1 flex-shrink-0">
                        S{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          placeholder="Stage name"
                          value={stage.name}
                          onChange={(e) => updateStage(index, 'name', e.target.value)}
                          className="w-full mb-3 bg-transparent border-none outline-none text-lg font-semibold placeholder-slate-500 p-1 focus:ring-2 focus:ring-purple-500/50"
                        />
                        <textarea
                          rows={2}
                          placeholder="Stage description"
                          value={stage.description}
                          onChange={(e) => updateStage(index, 'description', e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-slate-900 placeholder-slate-500 resize-none focus:ring-2 focus:ring-purple-500/50"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeStage(index)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all ml-auto -mt-2"
                      >
                        <FaTimes className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={addStage}
                    className="flex items-center gap-3 w-full p-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <FaPlus className="w-5 h-5" /> Add Stage
                  </motion.button>
                </div>
              </Section>

              {/* ✅ 9. Prizes - FULLY CONTROLLED */}
              <Section icon={FaTrophy} title="Prizes" subtitle="List prizes and rewards for winners. Mention type and short description">
                <div className="space-y-4">
                  {formData.prizes.map((prize, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/50 rounded-2xl p-6 flex items-start gap-4 group hover:shadow-md">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mt-1 flex-shrink-0">
                        🏆
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
                        <input 
                          type="text" 
                          placeholder="Prize name" 
                          value={prize.name}
                          onChange={(e) => updatePrize(index, 'name', e.target.value)}
                          className="p-4 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-yellow-500/50" 
                        />
                        <input 
                          type="text" 
                          placeholder="₹5000" 
                          value={prize.amount}
                          onChange={(e) => updatePrize(index, 'amount', e.target.value)}
                          className="p-4 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-yellow-500/50" 
                        />
                        <input 
                          type="text" 
                          placeholder="Cash" 
                          value={prize.type}
                          onChange={(e) => updatePrize(index, 'type', e.target.value)}
                          className="p-4 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-yellow-500/50" 
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removePrize(index)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all ml-auto -mt-2"
                      >
                        <FaTimes className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={addPrize}
                    className="flex items-center gap-3 w-full p-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                  >
                    <FaPlus className="w-5 h-5" /> Add Prize
                  </motion.button>
                </div>
              </Section>

            </div>

            {/* ✅ RIGHT SIDEBAR - Event Preview (4/12 columns on lg+, sticky) */}
            <div className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-24 self-start max-w-sm mx-auto lg:mx-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-6 text-white w-full"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-2 inline-block">Event Preview</h2>
                </div>
                
                <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{previewData.status}</span>
                    <span className="text-xs opacity-90">by {previewData.organization}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-xs">
                  <div className="flex items-center gap-1">
                    <FaGlobe className="w-3 h-3" />
                    <span>{previewData.mode}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>Location</span>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>Registration Opens:</span>
                  </div>
                  <span className="font-bold text-sm block">{previewData.regOpen}</span>
                </div>

                <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <h3 className="font-bold text-lg mb-2">{previewData.eventName}</h3>
                  <p className="text-xs leading-tight opacity-95">{previewData.description}</p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm rounded-2xl font-bold text-sm border border-white/30 hover:bg-white/30 transition-all"
                >
                  Preview Full Event →
                </motion.button>
              </motion.div>
            </div>

          </div>

          {/* ✅ Action Buttons - Full width below form on mobile, same row on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-6 pt-12 lg:pl-0"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 px-12 py-5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-3xl shadow-xl hover:shadow-2xl transition-all text-lg border border-slate-300"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="flex-1 px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all text-lg"
            >
              Create Event
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
