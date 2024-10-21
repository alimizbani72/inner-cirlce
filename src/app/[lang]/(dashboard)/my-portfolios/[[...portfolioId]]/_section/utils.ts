type DataItem = {
  [key: string]: string;
};

export const getActivePortfolioId = (id: any) => {
  if (!id?.length) {
    return null;
  }
  return  id[0]
};

export const calculateTotal = (data: DataItem[], field: keyof DataItem): number => {
  return data.reduce((total, rowItem) => {
    const value = parseFloat(rowItem[field]?.replace(/[$,]/g, "")) || 0;
    return total + value;
  }, 0);
};
