import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-sky-500 text-slate-900 hover:bg-sky-400 shadow-lg shadow-sky-500/40",
    ghost:
      "border border-slate-700 text-slate-200 hover:border-sky-500",
    subtle:
      "bg-slate-800/60 text-slate-100 hover:bg-slate-800/90 border border-slate-700/60",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
