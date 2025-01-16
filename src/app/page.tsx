import BackgroundTransition from "@/components/background-color";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClimate } from "@/services/open-meteo-api";
import {
  CloudRainWindIcon,
  DropletIcon,
  MapPinIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";

function formatterDate(date: Date, options: Intl.DateTimeFormatOptions) {
  const formatter = new Intl.DateTimeFormat("pt-BR", options);
  return formatter.format(date);
}

function WeatherMetric({
  value,
  label,
  icon: Icon,
  unit = "",
}: {
  value: number | string;
  label: string;
  icon: React.ElementType;
  unit?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 p-4 shadow-md transition-all hover:scale-105 hover:border-blue-500">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-blue-500" />
        <span className="text-2xl font-bold sm:text-3xl">
          {value}
          {unit}
        </span>
      </div>
      <span className="mt-2 text-center text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default async function Home() {
  const climate = await getClimate();
  const date = new Date(climate?.data.current.time);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Tempo em Gravataí, RS
              </h1>
              <MapPinIcon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center justify-center gap-2">
              <p className="text-muted-foreground">
                Última atualização:{" "}
                {formatterDate(date, { dateStyle: "short" })}
                {", "}
                {formatterDate(date, { timeStyle: "short" })}
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <WeatherMetric
              value={climate?.data.current.temperature_2m}
              unit="ºC"
              label="Temperatura atual"
              icon={ThermometerIcon}
            />
            <WeatherMetric
              value={climate?.data.current.apparent_temperature}
              unit="ºC"
              label="Sensação térmica"
              icon={ThermometerIcon}
            />
            <WeatherMetric
              value={climate?.data.daily.precipitation_probability_max[1]}
              unit="%"
              label="Chance de chuva"
              icon={CloudRainWindIcon}
            />
            <WeatherMetric
              value={climate?.data.current.wind_speed_10m}
              unit=" km/h"
              label="Velocidade do vento"
              icon={WindIcon}
            />
            <WeatherMetric
              value={climate?.data.current.relative_humidity_2m}
              unit="%"
              label="Umidade relativa"
              icon={DropletIcon}
            />
            <WeatherMetric
              value={climate?.data.current.wind_direction_10m}
              unit="°"
              label="Direção do vento"
              icon={WindIcon}
            />
          </div>
        </CardContent>
      </Card>
      <BackgroundTransition
        sunrise={climate?.data.daily.sunrise}
        sunset={climate?.data.daily.sunset}
      />
    </div>
  );
}
