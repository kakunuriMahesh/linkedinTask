import { Bar } from "react-chartjs-2";
import { FlaskConical } from "lucide-react";
import { CHART_COLORS, CHART_BORDERS, defaultChartOptions } from "../../utils/chartUtils";

export default function PestleChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full flex flex-col items-center justify-center text-gray-400">
      <FlaskConical size={40} className="mb-2 opacity-20" />
      No PESTLE Data
    </div>
  );

  const filtered = data.filter((d) => d._id && d._id.trim() !== "");

  const chartData = {
    labels: filtered.map((d) => d._id),
    datasets: [
      {
        label: "PESTLE",
        data: filtered.map((d) => d.value),
        backgroundColor: CHART_COLORS.slice(0, filtered.length),
        borderColor: CHART_BORDERS.slice(0, filtered.length),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    indexAxis: "y",
    plugins: {
      ...defaultChartOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "rgba(156,163,175,0.08)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100">
        <FlaskConical size={18} className="text-purple-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">PESTLE Analysis</h3>
      </div>
      <div className="h-72">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
