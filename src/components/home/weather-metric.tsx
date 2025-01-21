export function WeatherMetric({
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
