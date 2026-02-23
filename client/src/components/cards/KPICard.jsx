import { TrendingUp, TrendingDown, Target, Zap, Layers } from "lucide-react";

export default function KPICard({ title, value, icon, color }) {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      icon: "bg-indigo-600",
      text: "text-indigo-600 dark:text-indigo-400",
      shadow: "shadow-indigo-100 dark:shadow-none"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      icon: "bg-purple-600",
      text: "text-purple-600 dark:text-purple-400",
      shadow: "shadow-purple-100 dark:shadow-none"
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-900/20",
      icon: "bg-pink-600",
      text: "text-pink-600 dark:text-pink-400",
      shadow: "shadow-pink-100 dark:shadow-none"
    },
    teal: {
      bg: "bg-teal-50 dark:bg-teal-900/20",
      icon: "bg-teal-600",
      text: "text-teal-600 dark:text-teal-400",
      shadow: "shadow-teal-100 dark:shadow-none"
    },
  };

  const currentStyle = colorClasses[color] || colorClasses.indigo;

  // Map string icon names to Lucide components if needed, 
  // though we'll pass them directly from Dashboard.jsx
  const IconComponent = icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 flex items-center justify-between hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 group">
      <div>
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          {value ?? "—"}
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-md">
            <TrendingUp size={10} className="mr-1" />
            +2.4%
          </div>
          <span className="text-[10px] text-gray-400 font-medium">vs last month</span>
        </div>
      </div>
      
      <div className={`w-14 h-14 rounded-2xl ${currentStyle.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <div className={`p-3 rounded-xl ${currentStyle.icon} text-white shadow-lg ${currentStyle.shadow}`}>
          <IconComponent size={20} />
        </div>
      </div>
    </div>
  );
}
