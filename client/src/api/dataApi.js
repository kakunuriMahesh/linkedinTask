import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/data"
});

export const fetchDashboardData = (filters) =>
  API.get("/", { params: filters });

export const fetchKPI = (filters) =>
  API.get("/kpi", { params: filters });

export const fetchRegionData = (filters) =>
  API.get("/region", { params: filters });

export const fetchTopicData = (filters) =>
  API.get("/topic", { params: filters });

export const fetchCountryData = (filters) =>
  API.get("/country", { params: filters });

export const fetchPestleData = (filters) =>
  API.get("/pestle", { params: filters });

export const fetchIntensityData = (filters) =>
  API.get("/year-intensity", { params: filters });

export const fetchBubbleData = (filters) =>
  API.get("/bubble", { params: filters });

export const fetchFilterOptions = () =>
  API.get("/options");
