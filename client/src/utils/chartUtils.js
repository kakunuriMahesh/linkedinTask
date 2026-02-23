import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const CHART_COLORS = [
  "rgba(99,102,241,0.8)",    // Indigo
  "rgba(139,92,246,0.8)",    // Violet
  "rgba(236,72,153,0.8)",    // Pink
  "rgba(14,165,233,0.8)",    // Sky
  "rgba(20,184,166,0.8)",    // Teal
  "rgba(245,158,11,0.8)",    // Amber
  "rgba(239,68,68,0.8)",     // Red
  "rgba(34,197,94,0.8)",     // Green
  "rgba(168,85,247,0.8)",    // Purple
  "rgba(251,146,60,0.8)",    // Orange
  "rgba(6,182,212,0.8)",     // Cyan
  "rgba(244,63,94,0.8)",     // Rose
];

export const CHART_BORDERS = CHART_COLORS.map(c =>
  c.replace("0.8)", "1)")
);

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { family: "'Inter', sans-serif", size: 12 },
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: "rgba(17,24,39,0.9)",
      titleFont: { family: "'Inter', sans-serif", size: 13 },
      bodyFont: { family: "'Inter', sans-serif", size: 12 },
      padding: 12,
      cornerRadius: 8,
    }
  }
};
