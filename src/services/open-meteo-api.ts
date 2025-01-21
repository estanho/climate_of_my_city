import { climateSchema, climateType } from "@/types/climate-type";

export async function getClimate(): Promise<climateType | null> {
  const response = await fetch(process.env.OPEN_METEO_URL, {
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: ["climate"],
    },
  });

  if (!response.ok) {
    return null;
  }

  const responseInJson = await response.json();

  const formattedResponse = climateSchema.safeParse(responseInJson);

  if (!formattedResponse.success) {
    console.error("Failed to parse climate data:", formattedResponse.error);
    return null;
  }

  const data = formattedResponse.data;

  return data;
}
