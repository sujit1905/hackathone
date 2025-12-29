// src/pages/admin/ManageEvents.jsx - ✅ FIXED IMAGES + NO VIEW BUTTON
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiEdit, FiTrash2, FiCalendar, FiUsers, FiGlobe, FiMapPin
} from "react-icons/fi";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('adminEvents') || '[]');
    setEvents(savedEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const deleteEvent = (id) => {
    if (window.confirm("Delete this event?")) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));
    }
  };

  const EventCard = ({ event }) => {
    // ✅ FIXED IMAGE LOGIC - Handles all cases
    const getEventImage = () => {
      // PRIORITY 1: Real uploaded image (data URL)
      if (event.eventPosterPreview && event.eventPosterPreview.startsWith('data:')) {
        return event.eventPosterPreview;
      }
      // PRIORITY 2: Old filename fallback
      if (event.eventPoster?.name) {
        return `https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=${encodeURIComponent(event.eventPoster.name.slice(0,20))}`;
      }
      // PRIORITY 3: Dynamic gradient based on event name
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899'];
      const color = colors[Math.floor((event.eventName || 'Event').length % colors.length)];
      return `https://via.placeholder.com/400x250/${color.slice(1)}/FFFFFF?text=${encodeURIComponent((event.eventName || 'Event').slice(0,15))}`;
    };

    // ✅ Image error fallback
    const handleImageError = (e) => {
      const target = e.target;
      target.onerror = null;
      target.src = getEventImage(); // Use fallback
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group"
      >
        {/* ✅ EVENT IMAGE HEADER - FIXED */}
        <div className="h-48 w-full relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
          <img
            src={getEventImage()}
            alt={event.eventName || 'Event image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={handleImageError}
          />
          
          {/* Status Badge */}
          <div className={`absolute top-4 right-4 px-3 py-2 rounded-xl text-xs font-bold shadow-lg transform rotate-[-2deg] ${
            event.status === 'published' 
              ? 'bg-green-500 text-white' 
              : 'bg-yellow-500 text-white'
          }`}>
            {event.status?.toUpperCase() || 'DRAFT'}
          </div>

          {/* Paid Event Badge */}
          {event.eventType === 'paid' && (
            <div className="absolute top-14 left-4 bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg">
              💰 PAID
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header with status dot */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                event.status === 'published' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
              }`} />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1 leading-tight">
                  {event.eventName || 'Untitled Event'}
                </h3>
                {event.eventType === 'paid' && (
                  <div className="text-sm font-semibold text-emerald-600 mb-1 flex items-center gap-1">
                    💵 ₹{parseInt(event.eventFee) || 0}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Details - Compact */}
          <div className="space-y-3 mb-5">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiCalendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">
                {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN') : 'TBD'}
              </span>
              {event.regStartDate && event.regEndDate && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">
                  {new Date(event.regStartDate).toLocaleDateString('short')} - {new Date(event.regEndDate).toLocaleDateString('short')}
                </span>
              )}
            </div>

            {/* Mode & Venue */}
            <div className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
              {event.mode === 'online' ? 
                <FiGlobe className="w-4 h-4 flex-shrink-0" /> : 
                <FiMapPin className="w-4 h-4 flex-shrink-0" />
              }
              <span>{event.mode?.charAt(0).toUpperCase() + event.mode?.slice(1) || 'Online'}</span>
              {event.venueLink && (
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full truncate max-w-[140px] ml-2">
                  {event.venueLink.length > 25 ? event.venueLink.slice(0, 25) + '...' : event.venueLink}
                </span>
              )}
            </div>

            {/* Participants */}
            {(event.minParticipants || event.maxParticipants) && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiUsers className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">
                  {event.minParticipants || 0}-{event.maxParticipants || '∞'} participants
                </span>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {event.eventDescription && (
            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4 px-1">
              {event.eventDescription}
            </p>
          )}

          {/* Tags Preview */}
          {event.tags && (
            <div className="flex flex-wrap gap-2 mb-5">
              {event.tags.split(',').slice(0, 3).map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                  title={tag.trim()}
                >
                  {tag.trim().slice(0, 12)}{tag.trim().length > 12 ? '...' : ''}
                </span>
              ))}
              {event.tags.split(',').length > 3 && (
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
                  +{event.tags.split(',').length - 3}
                </span>
              )}
            </div>
          )}

          {/* ✅ Action Buttons - ONLY EDIT & DELETE (2 columns) */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/admin/edit/${event.id}`)}
              className="p-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-all text-sm font-medium border border-orange-100 hover:border-orange-200 flex items-center justify-center gap-1 col-span-1"
              title="Edit Event"
            >
              <FiEdit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteEvent(event.id)}
              className="p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all text-sm font-medium border border-red-100 hover:border-red-200 flex items-center justify-center gap-1 col-span-1"
              title="Delete Event"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2 leading-tight">
              Manage Events
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              {events.length} {events.length === 1 ? 'event' : 'events'} total
              {events.filter(e => e.status === 'published').length > 0 && (
                <span className="ml-2 text-green-600 font-semibold">
                  • {events.filter(e => e.status === 'published').length} published
                </span>
              )}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/create-event")}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 text-lg whitespace-nowrap"
          >
            + Create New Event
          </motion.button>
        </div>

        {/* Filters & Stats */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end lg:items-center mb-6">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="🔍 Search events by name, tags, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 text-lg transition-all shadow-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-4 border border-slate-200 rounded-2xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-lg shadow-sm"
            >
              <option value="all">All Events ({events.length})</option>
              <option value="published">Published ({events.filter(e => e.status === 'published').length})</option>
              <option value="draft">Draft ({events.filter(e => e.status === 'draft').length})</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-24 bg-white rounded-3xl shadow-xl border-2 border-dashed border-slate-200 hover:border-slate-300 transition-all"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <FiCalendar className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No events found</h3>
              <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Create your first event to get started'
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/create-event")}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all text-lg flex items-center gap-3 mx-auto"
              >
                ✨ Create First Event
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
