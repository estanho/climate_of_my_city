export function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  const validDate = new Date(date);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    ...options,
    timeZone,
  }).format(validDate);

  return formattedDate;
}
