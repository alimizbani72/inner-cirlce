export const getActivePortfolioId = (id: any) => {
  if (!id) {
    return null;
  }
  return Array.isArray(id) ? id[0] : id;
};
