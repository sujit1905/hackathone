// src/components/ui/Preloader.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1500); // 1.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f7f7fb]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo + name */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#fff7e6] border border-[#ffd591] shadow-sm">
                <span className="text-2xl font-bold text-[#fa8c16] leading-none">
                  C
                </span>
              </div>
              <span className="text-2xl font-semibold text-slate-900">
                Campus<span className="text-[#fa8c16]">Connect</span>
              </span>
            </div>

            {/* Bouncing dots */}
            <div className="flex gap-2 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-[#2563eb]"
                  initial={{ y: 0, opacity: 0.4 }}
                  animate={{ y: -6, opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.5,
                    delay: i * 0.12,
                  }}
                />
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-1">
              Discovering the best campus events for you…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
