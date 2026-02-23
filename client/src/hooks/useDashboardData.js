import { useEffect, useState } from "react";
import {
  fetchDashboardData,
  fetchKPI,
  fetchRegionData,
  fetchTopicData,
  fetchCountryData,
  fetchPestleData,
  fetchIntensityData,
  fetchBubbleData,
  fetchFilterOptions
} from "../api/dataApi";

export default function useDashboardData(filters) {
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState({});
  const [regionData, setRegionData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [pestleData, setPestleData] = useState([]);
  const [intensityData, setIntensityData] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [res, kpiRes, regionRes, topicRes, countryRes, pestleRes, intensityRes, bubbleRes] =
          await Promise.all([
            fetchDashboardData(filters),
            fetchKPI(filters),
            fetchRegionData(filters),
            fetchTopicData(filters),
            fetchCountryData(filters),
            fetchPestleData(filters),
            fetchIntensityData(filters),
            fetchBubbleData(filters)
          ]);
        setData(res.data);
        setKpi(kpiRes.data[0] || {});
        setRegionData(regionRes.data);
        setTopicData(topicRes.data);
        setCountryData(countryRes.data);
        setPestleData(pestleRes.data);
        setIntensityData(intensityRes.data);
        setBubbleData(bubbleRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
      setLoading(false);
    }
    load();
  }, [filters]);

  return {
    data,
    kpi,
    regionData,
    topicData,
    countryData,
    pestleData,
    intensityData,
    bubbleData,
    loading
  };
}

export function useFilterOptions() {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchFilterOptions();
        setOptions(res.data);
      } catch (err) {
        console.error("Failed to load filter options:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  return { options, loading };
}
