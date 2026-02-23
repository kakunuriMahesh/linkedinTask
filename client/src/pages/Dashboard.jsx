import { useState } from "react";
import { 
  BarChart3, 
  Zap, 
  Target, 
  TrendingUp, 
  Download,
  Database
} from "lucide-react";
import Layout from "../components/layout/Layout";
import FilterPanel from "../components/filters/FilterPanel";
import KPICard from "../components/cards/KPICard";
import RegionChart from "../components/charts/RegionChart";
import TopicChart from "../components/charts/TopicChart";
import IntensityChart from "../components/charts/IntensityChart";
import CountryChart from "../components/charts/CountryChart";
import PestleChart from "../components/charts/PestleChart";
import BubbleChart from "../components/charts/BubbleChart";
import useDashboardData from "../hooks/useDashboardData";

export default function Dashboard() {
  const [filters, setFilters] = useState({});
  const {
    data,
    kpi,
    regionData,
    topicData,
    countryData,
    pestleData,
    intensityData,
    bubbleData,
    loading,
  } = useDashboardData(filters);

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    
    // Only export fields that are useful
    const headers = [
      "intensity", "likelihood", "relevance", "year", "country", "topic", "region", "city"
    ];
    
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ];
    
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blackcoffer_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 dark:border-gray-700 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-bold text-lg animate-pulse tracking-tight">
            Syncing Dashboard...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white-800 dark:text-white tracking-tight">
            Data Insights
          </h2>
          <p className="text-sm text-gray-500 font-medium">Monitoring key performance indicators and trends</p>
        </div>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
        >
          <Download size={18} className="text-indigo-500 group-hover:-translate-y-0.5 transition-transform" />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <FilterPanel filters={filters} setFilters={setFilters} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Records"
          value={kpi?.totalRecords?.toLocaleString()}
          icon={Database}
          color="indigo"
        />
        <KPICard
          title="Avg Intensity"
          value={kpi?.avgIntensity?.toFixed(2)}
          icon={Zap}
          color="purple"
        />
        <KPICard
          title="Avg Likelihood"
          value={kpi?.avgLikelihood?.toFixed(2)}
          icon={Target}
          color="pink"
        />
        <KPICard
          title="Avg Relevance"
          value={kpi?.avgRelevance?.toFixed(2)}
          icon={TrendingUp}
          color="teal"
        />
      </div>

      {/* Primary Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <IntensityChart data={intensityData} />
        <BubbleChart data={bubbleData} />
      </div>

      {/* Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <RegionChart data={regionData} />
        </div>
        <div className="lg:col-span-1">
          <TopicChart data={topicData} />
        </div>
        <div className="lg:col-span-1">
          <CountryChart data={countryData} />
        </div>
      </div>

      {/* Deep Dive */}
      <div className="grid grid-cols-1 gap-8">
        <PestleChart data={pestleData} />
      </div>

      <footer className="mt-12 py-8 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
          Blackcoffer Enterprise Analytics Panel v2.0
        </p>
      </footer>
    </Layout>
  );
}
