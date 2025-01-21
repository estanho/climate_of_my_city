"use client";

import { useEffect, useState } from "react";

export function BackgroundTransition({
  sunrise,
  sunset,
}: {
  sunrise: Date;
  sunset: Date;
}) {
  const [backgroundClass, setBackgroundClass] = useState("");

  // Converte horários ISO 8601 para minutos do dia
  const parseTimeToMinutes = (isoString: Date) => {
    const date = new Date(isoString);
    return date.getHours() * 60 + date.getMinutes();
  };

  // Calcula a classe de fundo
  const calculateBackgroundClass = (minutes: number) => {
    const sunriseMinutes = parseTimeToMinutes(sunrise);
    const sunsetMinutes = parseTimeToMinutes(sunset);

    const sunriseStart = sunriseMinutes;
    const sunriseEnd = sunriseMinutes - 30;
    const sunsetStart = sunsetMinutes;
    const sunsetEnd = sunsetMinutes - 30;

    if (minutes >= sunriseEnd && minutes < sunriseStart) {
      setBackgroundClass("bg-gradient-to-b from-gray-700 to-blue-400");
    } else if (minutes >= sunsetEnd && minutes < sunsetStart) {
      setBackgroundClass("bg-gradient-to-b from-blue-400 to-orange-500");
    } else if (minutes >= sunriseEnd && minutes < sunsetStart) {
      setBackgroundClass("bg-blue-400");
    } else {
      setBackgroundClass("bg-gray-900");
    }
  };

  // Atualiza a classe de fundo com base no horário atual
  useEffect(() => {
    const updateBackground = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      calculateBackgroundClass(minutes);
    };

    updateBackground();
    const interval = setInterval(updateBackground, 60000);
    return () => clearInterval(interval);
  }, [sunrise, sunset]);

  return (
    <div
      className={`fixed -z-10 min-h-screen min-w-full ${backgroundClass}`}
    ></div>
  );
}
