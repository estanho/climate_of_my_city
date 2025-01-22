import { BackgroundTransition } from "@/components/home/background-color";
import { WeatherMetric } from "@/components/home/weather-metric";
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
    <main>
      {climate === null ? (
        <div>Carregando...</div>
      ) : (
        <>
          <BackgroundTransition climate={climate} />
          <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
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
                    <p className="text-muted-foreground">
                      Última atualização:{" "}
                      {formatDate(climate.current.time, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeatherMetric climate={climate} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </main>
  );
}
