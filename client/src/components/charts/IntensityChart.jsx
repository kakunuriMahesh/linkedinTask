import { Line } from "react-chartjs-2";
import { Zap } from "lucide-react";
import { defaultChartOptions } from "../../utils/chartUtils";

export default function IntensityChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full flex flex-col items-center justify-center text-gray-400">
      <Zap size={40} className="mb-2 opacity-20" />
      No Intensity Data
    </div>
  );

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Avg Intensity",
        data: data.map((d) => d.avgIntensity?.toFixed(2)),
        borderColor: "rgba(99,102,241,1)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(99,102,241,0.01)");
          gradient.addColorStop(1, "rgba(99,102,241,0.2)");
          return gradient;
        },
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(99,102,241,1)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
        tension: 0.45,
        fill: true,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156,163,175,0.08)" },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#94a3b8" },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100">
        <Zap size={18} className="text-indigo-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Intensity by Year</h3>
      </div>
      <div className="h-72">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
