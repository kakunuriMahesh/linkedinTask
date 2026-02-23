import { Bubble } from "react-chartjs-2";
import { Sparkles } from "lucide-react";
import { defaultChartOptions } from "../../utils/chartUtils";

export default function BubbleChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full flex flex-col items-center justify-center text-gray-400">
      <Sparkles size={40} className="mb-2 opacity-20" />
      No Bubble Data
    </div>
  );

  const chartData = {
    datasets: [
      {
        label: "Impact Analysis",
        data: data.slice(0, 100).map((item) => ({
          x: item.likelihood || 0,
          y: item.relevance || 0,
          r: Math.max((item.intensity || 0) * 1.2, 4),
        })),
        backgroundColor: "rgba(139,92,246,0.3)",
        borderColor: "rgba(139,92,246,0.8)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(139,92,246,0.6)",
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    scales: {
      x: {
        title: {
          display: true,
          text: "Likelihood",
          font: { family: "'Inter', sans-serif", size: 10, weight: "700" },
          color: "#6366f1"
        },
        grid: { color: "rgba(156,163,175,0.08)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
      y: {
        title: {
          display: true,
          text: "Relevance",
          font: { family: "'Inter', sans-serif", size: 10, weight: "700" },
          color: "#ec4899"
        },
        grid: { color: "rgba(156,163,175,0.08)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100">
        <Sparkles size={18} className="text-yellow-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Impact Analysis</h3>
      </div>
      <div className="h-72">
        <Bubble data={chartData} options={options} />
      </div>
    </div>
  );
}
