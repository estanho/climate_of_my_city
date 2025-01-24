"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { climateType } from "@/types/climate-type";
import { motion } from "framer-motion";
import {
  CloudRainWindIcon,
  DropletIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";

function metricsData(climate: climateType) {
  const metrics = [
    {
      icon: ThermometerIcon,
      value: climate.current.temperature_2m,
      unit: climate.current_units.temperature_2m,
      label: "Temperatura Atual",
    },
    {
      icon: ThermometerIcon,
      value: climate.current.apparent_temperature,
      unit: climate.current_units.apparent_temperature,
      label: "Sensação térmica",
    },
    {
      icon: CloudRainWindIcon,
      value: climate.daily.precipitation_probability_max[1],
      unit: climate.daily_units.precipitation_probability_max,
      label: "Chance de chuva",
    },
    {
      icon: WindIcon,
      value: climate.current.wind_speed_10m,
      unit: climate.current_units.wind_speed_10m,
      label: "Velocidade do vento",
    },
    {
      icon: DropletIcon,
      value: climate.current.relative_humidity_2m,
      unit: climate.current_units.relative_humidity_2m,
      label: "Umidade relativa",
    },
    {
      icon: WindIcon,
      value: climate.current.wind_direction_10m,
      unit: climate.current_units.wind_direction_10m,
      label: "Direção do vento",
    },
  ];

  return metrics;
}

export function WeatherMetric({ climate }: { climate: climateType }) {
  const metrics = metricsData(climate);

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", visualDuration: 1, bounce: 0.2 },
          }}
        >
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-white/10 bg-white/20 p-4 shadow-lg backdrop-blur-lg transition-all hover:scale-105 hover:border-blue-500"
          >
            <div className="flex items-center gap-2">
              <metric.icon className="h-6 w-6 text-blue-500" />
              <span className="text-2xl font-bold sm:text-3xl">
                {metric.value}
                {metric.unit}
              </span>
            </div>
            <span className="mt-2 text-center text-sm text-muted-foreground">
              {metric.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function WeatherMetricSkeleton() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((value) => (
        <Skeleton
          key={value}
          className="flex h-[100px] flex-col rounded-lg border-white/20 bg-white/30 p-4 shadow-lg backdrop-blur-lg"
        />
      ))}
    </div>
  );
}
