const StatCard = ({ label, value, accent }) => (
  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
    <div className={`mt-2 h-1 rounded-full ${accent}`} />
  </div>
);

export default StatCard;
