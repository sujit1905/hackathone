// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FcBusinessman ,FcBusinesswoman} from "react-icons/fc";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const emailKey = user?.email || "guest";
  const STORAGE_KEY = `profile_${emailKey}`;

  const defaultName = user?.name || (user?.email ? user.email.split("@")[0] : "User");

  const buildBaseProfile = () => ({
    name: defaultName,
    gender: "",
    phone: user?.phone || "",
    college: "DNICA",
    degree: "",
    branch: "",
    year: "",
    bio: "Passionate student exploring campus events and opportunities.",
    skills: ["Event Planning", "Team Management", "Public Speaking"],
    interests: ["Tech", "Sports", "Arts", "Music"]
  });

  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : buildBaseProfile();
    } catch {
      return buildBaseProfile();
    }
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch {}
  }, [emailKey, STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, STORAGE_KEY]);

  const handleChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleArrayUpdate = (field, value, action) => {
    setProfile((p) => {
      const current = [...p[field]];
      if (action === 'add' && value.trim()) {
        return { ...p, [field]: [...current, value.trim()] };
      }
      if (action === 'remove') {
        return { ...p, [field]: current.filter((_, i) => i !== value) };
      }
      return p;
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Show success toast here
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    logout();
    window.location.href = "/";
  };

  // Calculate profile completion
  const requiredFields = [
    profile.name,
    profile.gender,
    profile.phone,
    profile.college,
    profile.degree,
    profile.branch,
    profile.year
  ];
  const filledCount = requiredFields.filter(v => v && v.trim() !== "").length;
  const completion = Math.round((filledCount / requiredFields.length) * 100);

  // Avatar logic
  const getAvatarContent = () => {
    if (profile.gender === "Male") return <FcBusinessman />;
    if (profile.gender === "Female") return <FcBusinesswoman />;
    return "👤";
  };

  // SVG Pattern for background - Fixed version
  const svgPattern = encodeURIComponent(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="#ffffff" fill-opacity="0.1" fill-rule="evenodd"/></svg>`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Gradient Banner */}
      <div className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
            backgroundSize: '100px 100px'
          }}
        ></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-8">
          <div className="flex items-end w-full">
            {/* Avatar */}
            <div className="relative">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="h-40 w-40 rounded-2xl bg-white p-2 shadow-2xl"
              >
                <div className="h-full w-full rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                  {getAvatarContent()}
                </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {completion}% Complete
              </div>
            </div>

            {/* User Info */}
            <div className="ml-8 mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profile.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <span>@</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                  {user?.role === "admin" ? "CLUB ADMIN" : "STUDENT"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ml-auto flex gap-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <span>⏻</span>
                    Logout
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-16">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
            <span className="text-sm font-bold text-blue-600">{completion}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Complete all fields to unlock premium features
          </p>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Events Joined</span>
                  <span className="font-bold text-blue-600">00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certificates</span>
                  <span className="font-bold text-green-600">00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Connections</span>
                  <span className="font-bold text-pink-600">00</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/my-events"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📋</span>
                  </div>
                  <span className="font-medium text-gray-700">My Events</span>
                </Link>
                <button className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all w-full">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">🏆</span>
                  </div>
                  <span className="font-medium text-gray-700">Achievements</span>
                </button>
                <button className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all w-full">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">🔔</span>
                  </div>
                  <span className="font-medium text-gray-700">Notifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Profile Form Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex-1 py-4 text-center font-semibold transition-all ${
                    activeTab === "personal"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Personal Info
                </button>
                <button
                  onClick={() => setActiveTab("academic")}
                  className={`flex-1 py-4 text-center font-semibold transition-all ${
                    activeTab === "academic"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Academic Info
                </button>
                <button
                  onClick={() => setActiveTab("additional")}
                  className={`flex-1 py-4 text-center font-semibold transition-all ${
                    activeTab === "additional"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Additional
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              👤
                            </div>
                            <input
                              name="name"
                              value={profile.name}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                          </label>
                          <div className="flex gap-4">
                            {["Male", "Female", "Other"].map((gender) => (
                              <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  checked={profile.gender === gender}
                                  onChange={handleChange}
                                  disabled={!isEditing}
                                  className="h-5 w-5 text-blue-600"
                                />
                                <span className={`${!isEditing && profile.gender === gender ? "font-semibold" : ""}`}>
                                  {gender}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              📱
                            </div>
                            <input
                              name="phone"
                              value={profile.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500"
                              placeholder="+91 9876543210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              ✉️
                            </div>
                            <input
                              value={user?.email || ""}
                              disabled
                              className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "academic" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            College
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              🏫
                            </div>
                            <input
                              name="college"
                              value={profile.college}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Degree
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              🎓
                            </div>
                            <select
                              name="degree"
                              value={profile.degree}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                            >
                              <option value="">Select Degree</option>
                              <option value="B.Tech">B.Tech</option>
                              <option value="B.E.">B.E.</option>
                              <option value="B.Sc">B.Sc</option>
                              <option value="M.Tech">M.Tech</option>
                              <option value="MBA">MBA</option>
                              <option value="BBA">BBA</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Branch
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              📚
                            </div>
                            <select
                              name="branch"
                              value={profile.branch}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                            >
                              <option value="">Select Branch</option>
                              <option value="CSE">Computer Science</option>
                              <option value="IT">Information Technology</option>
                              <option value="ECE">Electronics & Communication</option>
                              <option value="MECH">Mechanical Engineering</option>
                              <option value="CIVIL">Civil Engineering</option>
                              <option value="EEE">Electrical Engineering</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              📅
                            </div>
                            <select
                              name="year"
                              value={profile.year}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                            >
                              <option value="">Select Year</option>
                              <option value="1st">First Year</option>
                              <option value="2nd">Second Year</option>
                              <option value="3rd">Third Year</option>
                              <option value="4th">Fourth Year</option>
                              <option value="5th">Fifth Year</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "additional" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Skills
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {profile.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
                            >
                              {skill}
                              {isEditing && (
                                <button
                                  onClick={() => handleArrayUpdate('skills', index, 'remove')}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Add a skill"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleArrayUpdate('skills', e.target.value, 'add');
                                  e.target.value = '';
                                }
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <button
                              onClick={(e) => {
                                const input = e.target.previousSibling;
                                handleArrayUpdate('skills', input.value, 'add');
                                input.value = '';
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Interests
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest, index) => (
                            <div
                              key={index}
                              className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1"
                            >
                              {interest}
                              {isEditing && (
                                <button
                                  onClick={() => handleArrayUpdate('interests', index, 'remove')}
                                  className="text-purple-500 hover:text-purple-700"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {isEditing && (
                    <div className="pt-6 border-t border-gray-200 mt-6 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Events Preview */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Events</h3>
                <Link
                  to="/my-events"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Hackathon 2024", status: "Completed", color: "bg-green-100 text-green-800" },
                  { title: "Tech Fest", status: "Ongoing", color: "bg-blue-100 text-blue-800" },
                  { title: "Cultural Night", status: "Upcoming", color: "bg-yellow-100 text-yellow-800" }
                ].map((event, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${event.color}`}>
                      {event.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;