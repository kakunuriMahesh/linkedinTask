module.exports = function buildFilter(query) {
  const filter = {};

  if (query.end_year) filter.end_year = query.end_year;
  if (query.topic) filter.topic = query.topic;
  if (query.sector) filter.sector = query.sector;
  if (query.region) filter.region = query.region;
  if (query.pestle) filter.pestle = query.pestle;
  if (query.source) filter.source = query.source;
  if (query.country) filter.country = query.country;
  if (query.city) filter.city = query.city;

  return filter;
};
