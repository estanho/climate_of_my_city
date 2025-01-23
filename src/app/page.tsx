import {
  BackgroundDefault,
  BackgroundTransition,
} from "@/components/home/background-color";
import {
  WeatherMetric,
  WeatherMetricSkeleton,
} from "@/components/home/weather-metric";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClimate } from "@/services/open-meteo-api";
import { formatDate } from "@/utils/formatDate";
import { MapPinIcon } from "lucide-react";

export default async function Home() {
  const climate = await getClimate();

  return (
    <main className="font-sans">
      {climate === null ? (
        <BackgroundDefault />
      ) : (
        <BackgroundTransition climate={climate} />
      )}

      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl border border-white/30 bg-white/60 text-foreground/90 shadow-lg backdrop-blur-lg">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Tempo em Gravataí, RS
                </h1>
                <MapPinIcon
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  strokeWidth={2.5}
                />
              </div>
            </CardTitle>
            <CardDescription>
              <div className="flex items-center justify-center gap-2">
                <p className="font-medium text-foreground/70">
                  Última atualização:{" "}
                  {climate === null
                    ? "--/--/----, --:--"
                    : formatDate(climate.current.time, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {climate === null ? (
              <WeatherMetricSkeleton />
            ) : (
              <WeatherMetric climate={climate} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
