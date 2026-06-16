type FilterType = string;

export function getChartData(selectedPortfolio: any, filter: FilterType) {
  if (!selectedPortfolio?.data) {
    return null;
  }

  // ✅ FIX: ensure it's always array
  const raw = selectedPortfolio.data;

  const dataArray = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw?.history)
        ? raw.history
        : [];

  const transformedData = dataArray.map((entry: any) => ({
    x: new Date(entry.date).getTime(),
    y: Number(entry.investment ?? entry.value ?? 0),
  }));

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  if (filter === "7d") {
    return transformedData.filter((p) => p.x >= sevenDaysAgo);
  }

  if (filter === "30d") {
    return transformedData.filter((p) => p.x >= thirtyDaysAgo);
  }

  return transformedData;
}
