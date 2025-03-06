type MoneyResponse = {
  currency_code?: string;
  value?: number | string;
};
import numeral from 'numeral';

const CURRENCY_CODE: Record<string, string> = {
  USD: '$',
};

export const toNumber = (input: any) => parseInt(input, 10) || 0;

export const addIranCode = (input: string) => `+98${input}`;

export const removeIranCode = (input: string | undefined) => (input ? `0${input.slice(3)}` : '');

export const toMinutes = (input: number | undefined) => (input ? Math.ceil(input / 60) : 0);

export const formatPrice = (input: number | undefined) => toNumber(input) / 100;

export const getProgress = (status: string | undefined, isReady: boolean | undefined): number => {
  const numericalProgress = toNumber(status?.split(':')?.[0]);

  const adjustedProgress = isReady ? numericalProgress : Math.round(numericalProgress * 0.9);

  return adjustedProgress;
};

export const isOdd = (number: number): boolean => number % 2 === 0;

export const formatCurrency = (props: undefined | MoneyResponse) =>
  props?.value
    ? numeral(props.value)
        .format('$0,0.00')
        .replace('$', CURRENCY_CODE[props.currency_code!] || '$')
    : 0;

export const formatCurrencyWithoutDollar = (props: undefined | MoneyResponse) =>
  props?.value ? numeral(props.value).format('0,0.00') : 0;

export function isoToTimestamp(isoString: string) {
  const date = new Date(isoString);
  return Math.floor(date.getTime() / 1000);
}

export const formatTitle = (title: string, sign: string = '$') => {
  return `${title} ${sign}`;
};
