export async function getClimate() {
  const reponse = await fetch(process.env.OPEN_METEO_URL, {
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: ["climate"],
    },
  });

  if (!reponse.ok) {
    return;
  }

  const data = await reponse.json();
  return { data };
}
