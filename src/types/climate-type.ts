import { z } from "zod";

const utcDateTimeSchema = z
  .string()
  .refine((value) => {
    const utcDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z?$/;
    if (!utcDateTimeRegex.test(value)) {
      return false;
    }

    const date = new Date(value.endsWith("Z") ? value : `${value}Z`);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 16) === value;
  })
  .transform((value) => {
    return new Date(value.endsWith("Z") ? value : `${value}Z`);
  });

const currentUnitsSchema = z.object({
  time: z.string(),
  interval: z.string(),
  temperature_2m: z.string(),
  relative_humidity_2m: z.string(),
  apparent_temperature: z.string(),
  is_day: z.string(),
  cloud_cover: z.string(),
  wind_speed_10m: z.string(),
  wind_direction_10m: z.string(),
});

const currentSchema = z.object({
  time: utcDateTimeSchema,
  interval: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  apparent_temperature: z.number(),
  is_day: z.number(),
  cloud_cover: z.number(),
  wind_speed_10m: z.number(),
  wind_direction_10m: z.number(),
});

const hourly_units = z.object({
  time: z.string(),
  temperature_2m: z.string(),
  precipitation_probability: z.string(),
  cloud_cover: z.string(),
  wind_speed_10m: z.string(),
});

const hourly = z.object({
  time: z.array(utcDateTimeSchema),
  temperature_2m: z.array(z.number()),
  precipitation_probability: z.array(z.number()),
  cloud_cover: z.array(z.number()),
  wind_speed_10m: z.array(z.number()),
});

const daily_units = z.object({
  time: z.string(),
  temperature_2m_max: z.string(),
  temperature_2m_min: z.string(),
  sunrise: z.string(),
  sunset: z.string(),
  precipitation_probability_max: z.string(),
  wind_speed_10m_max: z.string(),
});

const daily = z.object({
  time: z.array(z.string().date()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  sunrise: z.array(utcDateTimeSchema),
  sunset: z.array(utcDateTimeSchema),
  precipitation_probability_max: z.array(z.number()),
  wind_speed_10m_max: z.array(z.number()),
});

export const climateSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: currentUnitsSchema,
  current: currentSchema,
  hourly_units: hourly_units,
  hourly: hourly,
  daily_units: daily_units,
  daily: daily,
});

export type climateType = z.infer<typeof climateSchema>;
