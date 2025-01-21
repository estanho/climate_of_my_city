export function formatDate(
  date: Date | string | undefined,
  options: Intl.DateTimeFormatOptions
) {
  const validDate = date instanceof Date ? date : new Date(date || "");

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    ...options,
    timeZone,
  }).format(validDate);

  return formattedDate;
}
