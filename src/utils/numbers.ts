export const toReadableNumber = (decimals: number, number = '0'): string => {
  if (!decimals) return number;

  const wholeStr = number.substring(0, number.length - decimals) || '0';
  const fractionStr = number
    .substring(number.length - decimals)
    .padStart(decimals, '0')
    .substring(0, decimals);

  return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, '');
};

export function formatWithCommas(value: string): string {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) {
    value = value.replace(pattern, '$1,$2');
  }
  return value;
}

export const toPrecision = (
  number: string,
  precision: number,
  withCommas = false,
  atLeastOne = true,
): string => {
  const [whole, decimal = ''] = number.split('.');

  let str = `${withCommas ? formatWithCommas(whole) : whole}.${decimal.slice(
    0,
    precision,
  )}`.replace(/\.$/, '');
  if (atLeastOne && Number(str) === 0 && str.length > 1) {
    const n = str.lastIndexOf('0');
    str = str.slice(0, n) + str.slice(n).replace('0', '1');
  }

  return str;
};
export const toRoundedReadableNumber = ({
  decimals,
  number,
  precision = 6,
  withCommas = true,
}: {
  decimals: number;
  number?: string;
  precision?: number;
  withCommas?: boolean;
}): string => {
  return toPrecision(toReadableNumber(decimals, number), precision, withCommas);
};

export const toInternationalCurrencySystem = (
  labelValue: string,
  percent?: number,
) => {
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(percent || 2) + 'B'
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(percent || 2) + 'M'
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(percent || 2) + 'K'
    : Math.abs(Number(labelValue)).toFixed(percent || 2);
};
