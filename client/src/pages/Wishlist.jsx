// src/pages/Wishlist.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-4 text-4xl">
        <span className="text-pink-400">♡</span>
      </div>

      {!user ? (
        <>
          <p className="text-sm font-medium text-slate-700 mb-2">
            Log in to see your wishlist
          </p>
          <p className="text-xs text-slate-500 mb-4 max-w-sm">
            Save events you love and access them quickly whenever you come back.
          </p>
          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
          >
            Log in
          </Link>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          Your wishlist is empty. Start liking events to see them here.
        </p>
      )}
    </div>
  );
};

export default Wishlist;
