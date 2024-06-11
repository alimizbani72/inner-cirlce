export const toNumber = (input: any) => parseInt(input, 10) || 0;

export const addIranCode = (input: string) => `+98${input}`;

export const removeIranCode = (input: string | undefined) => (input ? `0${input.slice(3)}` : "");

export const toMinutes = (input: number | undefined) => (input ? Math.ceil(input / 60) : 0);

export const formatPrice = (input: number | undefined) => toNumber(input) / 100;

export const getProgress = (status: string | undefined, isReady: boolean | undefined): number => {
  const numericalProgress = toNumber(status?.split(":")?.[0]);

  const adjustedProgress = isReady ? numericalProgress : Math.round(numericalProgress * 0.9);

  return adjustedProgress;
};

export const isOdd = (number: number): boolean => number % 2 === 0;
