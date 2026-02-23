const Data = require("../models/Data");
const buildFilter = require("../utils/buildFilter");

/* ========================================
   BASE FILTERED DATA
======================================== */

exports.getFilteredData = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Data.find(filter).limit(1000);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   KPI DATA
======================================== */

exports.getKPI = async (req, res) => {
  try {
    const result = await Data.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" }
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   REGION DISTRIBUTION
======================================== */

exports.getRegionDistribution = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: filter },
      { $group: { _id: "$region", value: { $sum: 1 } } },
      { $sort: { value: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   TOPIC DISTRIBUTION
======================================== */

exports.getTopicDistribution = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: filter },
      { $group: { _id: "$topic", value: { $sum: 1 } } },
      { $sort: { value: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   COUNTRY DISTRIBUTION
======================================== */

exports.getCountryDistribution = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: filter },
      { $group: { _id: "$country", value: { $sum: 1 } } },
      { $sort: { value: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   INTENSITY BY YEAR
======================================== */

exports.getIntensityByYear = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: { ...filter, start_year: { $ne: "" } } },
      {
        $group: {
          _id: "$start_year",
          avgIntensity: { $avg: "$intensity" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   PESTLE DISTRIBUTION
======================================== */

exports.getPestleDistribution = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: filter },
      { $group: { _id: "$pestle", value: { $sum: 1 } } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   BUBBLE DATA (Intensity vs Likelihood vs Relevance)
======================================== */

exports.getBubbleData = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

    const result = await Data.aggregate([
      { $match: filter },
      {
        $project: {
          likelihood: 1,
          relevance: 1,
          intensity: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ========================================
   FILTER OPTIONS
======================================== */

exports.getOptions = async (req, res) => {
  try {
    const fields = [
      "topic",
      "region",
      "country",
      "sector",
      "pestle",
      "source",
      "end_year",
      "city"
    ];

    const options = {};

    for (const field of fields) {
      const distinctValues = await Data.distinct(field);
      options[field] = distinctValues.filter(v => v !== "" && v !== null && v !== undefined).sort();
    }

    res.json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
