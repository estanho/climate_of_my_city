import { climateSchema, climateType } from "@/types/climate-type";

export async function getClimate(): Promise<climateType | null> {
  if (!process.env.OPEN_METEO_URL) {
    console.error("URL da API não configurada");
    return null;
  }

  try {
    const response = await fetch(process.env.OPEN_METEO_URL, {
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["climate"],
      },
    });

    if (!response.ok) {
      console.error(`Erro na API: ${response.status}`);
      return null;
    }

    const responseInJson = await response.json();
    const formattedResponse = climateSchema.safeParse(responseInJson);

    if (!formattedResponse.success) {
      console.error(
        "Erro ao formatar retorno da API.",
        formattedResponse.error
      );
      return null;
    }

    return formattedResponse.data;
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
}
