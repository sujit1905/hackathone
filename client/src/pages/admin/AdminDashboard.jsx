import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaPlus, FaCalendarCheck, FaChartLine, FaUsers, FaBell, 
  FaArrowRight 
} from "react-icons/fa6";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-slate-600">Manage your events and hosting platform.</p>
        </div>
      </div>

    

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-200/50 group" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Total Events</p>
              <p className="text-4xl font-black text-slate-900">1,234</p>
              <p className="text-emerald-600 font-semibold text-sm mt-1">+12% from last week</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              📊
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-200/50 group" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Registrations</p>
              <p className="text-4xl font-black text-slate-900">5,678</p>
              <p className="text-emerald-600 font-semibold text-sm mt-1">+28% from last week</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              📈
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-200/50 group" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Pending</p>
              <p className="text-4xl font-black text-slate-900">23</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">-2% from last week</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              ⏳
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-200/50 group" 
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-3">Queries</p>
              <p className="text-4xl font-black text-slate-900">156</p>
              <p className="text-emerald-600 font-semibold text-sm mt-1">+15% from last week</p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              💬
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity / Notifications */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden"
      >
        <div className="p-8 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <FaBell />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                <p className="text-sm text-slate-500">Stay updated with your events</p>
              </div>
            </div>
            <Link to="/admin/notifications" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View All <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { title: "TechFest 2025", desc: "45 new registrations", time: "2h ago", icon: "📈" },
            { title: "Hackathon Round 1", desc: "Results published", time: "5h ago", icon: "✅" },
            { title: "New query received", desc: "From participant John Doe", time: "1d ago", icon: "💬" }
          ].map((activity, index) => (
            <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xl">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm line-clamp-1">{activity.title}</p>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-1">{activity.desc}</p>
                  <p className="text-xs text-slate-500 mt-2">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
