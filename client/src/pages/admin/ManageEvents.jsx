// src/pages/admin/ManageEvents.jsx
import { motion } from "framer-motion";

const ManageEvents = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-slate-200/50">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          📋
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Manage Events</h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          View, edit, and manage all your hosted events here.
        </p>
        <div className="text-slate-500 text-lg">Coming Soon...</div>
      </div>
    </motion.div>
  );
};

export default ManageEvents;
