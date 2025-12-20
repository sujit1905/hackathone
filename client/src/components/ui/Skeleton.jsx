const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-lg bg-slate-800/70 ${className}`}
  />
);

export default Skeleton;
