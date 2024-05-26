export const removeName = (originalKey: string) => {
  const parts = originalKey.split("-");
  parts.pop();
  const newKey = parts.join("-");

  return newKey;
};

export const splitString = (originalKey: string | undefined, splitKey: string, partKey: number) => {
  const parts = originalKey?.split(splitKey);

  return parts?.[partKey] || "";
};

export const combinedNameID = (name: string | undefined, key: string | undefined) => `${key}-@${name}`;

export const truncateString = (str: string, maxLength: number): string => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

export const formatSubscriptionName = (subscriptionIdentifier: string): string => {
  const parts = subscriptionIdentifier.split("_");

  // Assuming the format is always [brand]_[tier]_[period]
  // Map the parts to their readable equivalents
  const tierMap: { [key: string]: string } = {
    basic: "Basic",
    standard: "Standard",
    premium: "Premium",
  };

  const periodMap: { [key: string]: string } = {
    daily: "Daily",
    monthly: "Monthly",
    yearly: "Yearly",
  };

  const tier = tierMap[parts[1]];
  const period = periodMap[parts[2]];

  return `${tier}/${period}`;
};
