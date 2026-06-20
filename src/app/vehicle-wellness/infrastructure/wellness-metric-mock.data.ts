import { WellnessMetricResource } from '@app/vehicle-wellness/infrastructure/wellness-metrics.response';

/**
 * Mock data for IoT telemetry sensors
 * Simulates temperature, pressure, impact, air quality, and GPS location data
 */
export const MOCK_WELLNESS_METRICS: WellnessMetricResource[] = [
  {
    id: 1,
    vehicleId: 1,
    latitude: 10.3910,
    longitude: -75.4794,
    CO2Ppm: 420,
    NH3Ppm: 5,
    BenzenePpm: 12,
    temperatureCelsius: 38.5,
    humidityPercentage: 65,
    pressureHpa: 1013.25,
    impactDetected: false,
    registeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    vehicleId: 1,
    latitude: 10.3915,
    longitude: -75.4800,
    CO2Ppm: 435,
    NH3Ppm: 6,
    BenzenePpm: 14,
    temperatureCelsius: 42.1,
    humidityPercentage: 58,
    pressureHpa: 1012.8,
    impactDetected: true,
    registeredAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: 3,
    vehicleId: 1,
    latitude: 10.3920,
    longitude: -75.4810,
    CO2Ppm: 410,
    NH3Ppm: 4,
    BenzenePpm: 10,
    temperatureCelsius: 35.8,
    humidityPercentage: 72,
    pressureHpa: 1013.5,
    impactDetected: false,
    registeredAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 4,
    vehicleId: 2,
    latitude: 10.3850,
    longitude: -75.4750,
    CO2Ppm: 445,
    NH3Ppm: 7,
    BenzenePpm: 16,
    temperatureCelsius: 40.2,
    humidityPercentage: 60,
    pressureHpa: 1013.0,
    impactDetected: false,
    registeredAt: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: 5,
    vehicleId: 2,
    latitude: 10.3855,
    longitude: -75.4745,
    CO2Ppm: 455,
    NH3Ppm: 8,
    BenzenePpm: 18,
    temperatureCelsius: 44.5,
    humidityPercentage: 55,
    pressureHpa: 1012.5,
    impactDetected: true,
    registeredAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
  }
];

/**
 * Generate mock data for a specific vehicle
 * @param vehicleId - The vehicle ID to generate data for
 * @returns Array of mock wellness metrics for the vehicle
 */
export function getMockMetricsByVehicleId(vehicleId: number): WellnessMetricResource[] {
  return MOCK_WELLNESS_METRICS.filter(metric => metric.vehicleId === vehicleId);
}

/**
 * Generate a random mock metric for real-time simulation
 * @param vehicleId - The vehicle ID for the metric
 * @returns A new mock wellness metric with random values
 */
export function generateRandomMockMetric(vehicleId: number): WellnessMetricResource {
  const now = new Date();
  const temperatureBase = 35 + Math.random() * 15; // 35-50°C
  const pressureBase = 1012 + (Math.random() - 0.5) * 3; // Around 1013 hPa with variation
  const hasImpact = Math.random() > 0.8; // 20% chance of impact

  return {
    id: Math.floor(Math.random() * 10000),
    vehicleId: vehicleId,
    latitude: 10.3900 + (Math.random() - 0.5) * 0.01,
    longitude: -75.4800 + (Math.random() - 0.5) * 0.01,
    CO2Ppm: 400 + Math.floor(Math.random() * 100),
    NH3Ppm: 3 + Math.floor(Math.random() * 8),
    BenzenePpm: 8 + Math.floor(Math.random() * 15),
    temperatureCelsius: Math.round(temperatureBase * 10) / 10,
    humidityPercentage: 50 + Math.floor(Math.random() * 40),
    pressureHpa: Math.round(pressureBase * 100) / 100,
    impactDetected: hasImpact,
    registeredAt: new Date()
  };
}

