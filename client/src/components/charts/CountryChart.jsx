import { Doughnut } from "react-chartjs-2";
import { Flag } from "lucide-react";
import { CHART_COLORS, CHART_BORDERS, defaultChartOptions } from "../../utils/chartUtils";

export default function CountryChart({ data }) {
  if (!data || data.length === 0) return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full flex flex-col items-center justify-center text-gray-400">
      <Flag size={40} className="mb-2 opacity-20" />
      No Country Data
    </div>
  );

  const filtered = data.filter((d) => d._id && d._id.trim() !== "");
  const top10 = filtered.slice(0, 10);

  const chartData = {
    labels: top10.map((d) => d._id),
    datasets: [
      {
        label: "Countries",
        data: top10.map((d) => d.value),
        backgroundColor: CHART_COLORS,
        borderColor: CHART_BORDERS,
        borderWidth: 2,
        hoverOffset: 15,
        cutout: "70%",
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
        <Flag size={18} className="text-teal-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Top Countries</h3>
      </div>
      <div className="h-72">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
