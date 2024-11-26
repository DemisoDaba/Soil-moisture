// Define the region of interest: Bilate Watershed
var bilateRegion = ee.Geometry.Rectangle([37.33, 6.5, 38.83, 8.33]);

// Set the time period for analysis
var startDate = '1990-01-01';
var endDate = '2020-12-31';

// ---------------- SOIL MOISTURE ----------------
// SMAP dataset for soil moisture
var smap = ee.ImageCollection("NASA_USDA/HSL/SMAP10KM_soil_moisture")
    .filterDate(startDate, endDate)
    .filterBounds(bilateRegion);

// Calculate mean soil moisture for the period
var soilMoisture = smap.select('ssm').mean();

// ---------------- TEMPERATURE ----------------
// ERA5 dataset for temperature and precipitation
var era5 = ee.ImageCollection("ECMWF/ERA5/DAILY")
    .filterDate(startDate, endDate);

// Extract max temperature, min temperature, and mean temperature
var maxTemp = era5.select('maximum_2m_air_temperature').mean();
var minTemp = era5.select('minimum_2m_air_temperature').mean();
var meanTemp = era5.select('mean_2m_air_temperature').mean();

// ---------------- PRECIPITATION ----------------
// Extract total precipitation
var precipitation = era5.select('total_precipitation').mean();

// ---------------- EXPORT DATA ----------------
// Soil Moisture
Export.image.toDrive({
  image: soilMoisture,
  description: 'SoilMoisture_BilateWatershed',
  scale: 9000,  // 9 km resolution
  region: bilateRegion
});

// Max Temperature
Export.image.toDrive({
  image: maxTemp,
  description: 'MaxTemp_BilateWatershed',
  scale: 1000,  // 1 km resolution
  region: bilateRegion
});

// Min Temperature
Export.image.toDrive({
  image: minTemp,
  description: 'MinTemp_BilateWatershed',
  scale: 1000,  // 1 km resolution
  region: bilateRegion
});

// Mean Temperature
Export.image.toDrive({
  image: meanTemp,
  description: 'MeanTemp_BilateWatershed',
  scale: 1000,  // 1 km resolution
  region: bilateRegion
});

// Precipitation
Export.image.toDrive({
  image: precipitation,
  description: 'Precipitation_BilateWatershed',
  scale: 1000,  // 1 km resolution
  region: bilateRegion
});

print("Data export tasks started. Check your Google Drive for results.");
