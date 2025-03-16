export const customSort = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc'
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Parse numbers if possible
    const aNum = parseFloat(String(aValue));
    const bNum = parseFloat(String(bValue));

    if (!isNaN(aNum) && !isNaN(bNum) && isFinite(aNum) && isFinite(bNum)) {
      return direction === 'asc' ? aNum - bNum : bNum - aNum;
    }

    // Fall back to string comparison
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    return direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
};
