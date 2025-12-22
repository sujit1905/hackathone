// src/components/common/RouteLoader.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <div className="flex items-end gap-[4px]">
            {/* 5 bars with different base heights + stagger delay */}
            <span className="w-[3px] h-6 bg-slate-800 origin-bottom animate-equalize [animation-delay:0s]" />
            <span className="w-[3px] h-5 bg-slate-800 origin-bottom animate-equalize [animation-delay:0.1s]" />
            <span className="w-[3px] h-7 bg-slate-800 origin-bottom animate-equalize [animation-delay:0.2s]" />
            <span className="w-[3px] h-4 bg-slate-800 origin-bottom animate-equalize [animation-delay:0.3s]" />
            <span className="w-[3px] h-6 bg-slate-800 origin-bottom animate-equalize [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      {children}
    </>
  );
};

export default RouteLoader;
