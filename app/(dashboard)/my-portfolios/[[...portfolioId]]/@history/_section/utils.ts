type FilterType = string;
export function getChartData(
  selectedPortfolio: { data?: any[] | undefined } | null | undefined,
  filter: FilterType
) {
  if (!selectedPortfolio?.data) {
    return null;
  }

  const transformedData = selectedPortfolio.data.map((entry) => ({
    x: new Date(entry.date).getTime(),
    y: parseInt(entry.investment, 10),
  }));

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  if (filter === '7d') {
    return transformedData.filter((point) => point.x >= sevenDaysAgo);
  }
  if (filter === '30d') {
    return transformedData.filter((point) => point.x >= thirtyDaysAgo);
  }

  return transformedData;
}
