import { Pie } from "react-chartjs-2";
import { Globe } from "lucide-react";
import { CHART_COLORS, CHART_BORDERS, defaultChartOptions } from "../../utils/chartUtils";

export default function RegionChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full flex flex-col items-center justify-center text-gray-400">
      <Globe size={40} className="mb-2 opacity-20" />
      No Region Data
    </div>
  );

  const filtered = data.filter((d) => d._id && d._id.trim() !== "");
  const top10 = filtered.slice(0, 10);

  const chartData = {
    labels: top10.map((d) => d._id),
    datasets: [
      {
        label: "Regions",
        data: top10.map((d) => d.value),
        backgroundColor: CHART_COLORS,
        borderColor: CHART_BORDERS,
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins.legend,
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-100">
        <Globe size={18} className="text-indigo-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Region Distribution</h3>
      </div>
      <div className="h-72">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
