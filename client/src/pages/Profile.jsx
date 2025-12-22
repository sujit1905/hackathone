// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  const emailKey = user?.email || "guest";
  const STORAGE_KEY = `dnica_profile_${emailKey}`;

  const defaultName =
    user?.name || (user?.email ? user.email.split("@")[0] : "");

  const buildBaseProfile = () => ({
    name: defaultName,
    gender: "",
    phone: user?.phone || "",
    college: "DNICA",
    degree: "",
    branch: "",
  });

  // 1) INITIAL STATE: read once from localStorage (or use base defaults)
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return buildBaseProfile();
    } catch {
      return buildBaseProfile();
    }
  });

  const [editing, setEditing] = useState(false);

  // 2) When user (email) changes, switch to that user's saved profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(buildBaseProfile());
      }
    } catch {
      setProfile(buildBaseProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailKey]);

  // 3) Persist current profile whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore errors
    }
  }, [profile, STORAGE_KEY]);

  const handleChange = (e) =>
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false); // profile already saved by effect
  };

  const handleCancel = () => {
    // reload last saved profile for this user
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(buildBaseProfile());
      }
    } catch {
      setProfile(buildBaseProfile());
    }
    setEditing(false);
  };

  // avatar: first letter by default, image after gender choice
  const showImage = profile.gender === "Male" || profile.gender === "Female";
  let avatarSrc = "";
  if (profile.gender === "Female") {
    avatarSrc = "/images/femalepro.jpg";
  } else if (profile.gender === "Male") {
    avatarSrc = "/images/maleimage.png";
  }

  const firstLetter =
    (profile.name || user?.name || user?.email || "U").charAt(0).toUpperCase();

  const fields = [
    profile.name,
    profile.gender,
    profile.phone,
    profile.college,
    profile.degree,
    profile.branch,
  ];
  const filledCount = fields.filter((v) => v && v.trim() !== "").length;
  const completion = Math.round((filledCount / fields.length) * 100);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col bg-gradient-to-b from-[#facc15]/30 via-white to-[#bfdbfe]/40">
      <div className="max-w-3xl w-full mx-auto mt-16 mb-12 relative">
        <div className="h-36 w-full rounded-t-[32px] bg-gradient-to-r from-[#facc15] via-[#f97316] to-[#3b82f6]" />

        <div className="w-full bg-white rounded-[32px] shadow-[0_22px_60px_rgba(15,23,42,0.25)] pt-20 pb-10 px-10 -mt-16 relative z-10">
          {/* avatar */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
            <div className="h-28 w-28 rounded-full bg-white shadow-[0_12px_30px_rgba(15,23,42,0.25)] flex items-center justify-center overflow-hidden">
              {showImage ? (
                <img
                  src={avatarSrc}
                  alt="Profile avatar"
                  className="h-24 w-24 object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#1d4ed8] flex items-center justify-center text-4xl font-semibold text-white">
                  {firstLetter}
                </div>
              )}
            </div>
          </div>

          {/* header */}
          <div className="text-center mt-2">
            <p className="text-xs text-slate-400 mb-1">👤</p>
            <h1 className="text-xl font-semibold tracking-wide text-slate-900">
              {profile.name || "Not set"}
            </h1>

            {user?.email && (
              <p className="text-sm text-slate-500 mt-1 flex items-center justify-center gap-1">
                <span>@</span>
                <span>{user.email}</span>
              </p>
            )}

            <span className="mt-2 inline-block px-3 py-1 rounded-full bg-[#e5f2ff] text-[11px] font-semibold text-[#2563eb] uppercase tracking-[0.18em]">
              {user?.role === "admin" ? "CLUB" : "STUDENT"}
            </span>

            <div className="mt-4 flex justify-center">
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f87171] text-white text-sm font-semibold shadow-[0_12px_30px_rgba(248,113,113,0.5)] hover:bg-[#ef4444]"
              >
                ⏻ Log out
              </button>
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-6">
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#facc15]"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400 text-center">
              Profile Completion: {completion}%
            </p>
          </div>

          {/* content */}
          {!editing ? (
            <>
              {/* VIEW MODE */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                <div>
                  <h2 className="text-[13px] font-semibold text-[#f59e0b] mb-3">
                    Personal Info
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span className="text-slate-700">
                        {profile.name || "Not set"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>⚧</span>
                      <span>{profile.gender || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span>📞</span>
                      <span>{profile.phone || "Not set"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[13px] font-semibold text-[#2563eb] mb-3">
                    Academic Info
                  </h2>
                  <div className="space-y-3 text-slate-400">
                    <div className="flex items-center gap-2">
                      <span>🏫</span>
                      <span>{profile.college || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎓</span>
                      <span>{profile.degree || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>{profile.branch || "Not set"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Not set</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  onClick={() => setEditing(true)}
                  className="px-8 py-2.5 rounded-full bg-[#fbbf24] text-slate-900 font-semibold text-sm shadow-[0_12px_30px_rgba(245,181,5,0.35)] hover:bg-[#f59e0b]"
                >
                  Edit Profile
                </button>
                <Link
                  to="/my-events"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  View your registrations
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* EDIT MODE */}
              <form onSubmit={handleSave} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                  <div>
                    <h2 className="text-[13px] font-semibold text-[#f59e0b] mb-3">
                      Personal Info
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          Full Name
                        </label>
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <input
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-sm outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          Gender
                        </label>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={profile.gender === "Male"}
                              onChange={handleChange}
                            />
                            <span>Male</span>
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={profile.gender === "Female"}
                              onChange={handleChange}
                            />
                            <span>Female</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          Mobile
                        </label>
                        <div className="flex items-center gap-2">
                          <span>📞</span>
                          <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-sm outline-none"
                            placeholder="Enter mobile number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-[13px] font-semibold text-[#2563eb] mb-3">
                      Academic Info
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          College
                        </label>
                        <div className="flex items-center gap-2">
                          <span>🏫</span>
                          <input
                            name="college"
                            value={profile.college}
                            onChange={handleChange}
                            className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-sm outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          Degree
                        </label>
                        <div className="flex items-center gap-2">
                          <span>🎓</span>
                          <select
                            name="degree"
                            value={profile.degree}
                            onChange={handleChange}
                            className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-sm outline-none bg-white"
                          >
                            <option value="">-- Select --</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="B.E.">B.E.</option>
                            <option value="B.Sc">B.Sc</option>
                            <option value="M.Tech">M.Tech</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">
                          Branch
                        </label>
                        <div className="flex items-center gap-2">
                          <span>📚</span>
                          <select
                            name="branch"
                            value={profile.branch}
                            onChange={handleChange}
                            className="flex-1 border border-slate-200 rounded-md px-2 py-1.5 text-sm outline-none bg-white"
                          >
                            <option value="">-- Select --</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-7 py-2.5 rounded-md bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-слate-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <Link
                  to="/my-events"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  View your registrations
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
