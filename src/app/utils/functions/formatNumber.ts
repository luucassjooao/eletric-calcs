export function formatNumber(number: number) {
  if (number === 0) return '0';

  const units = [
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'G' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'k' },
      { value: 1, symbol: '' },
      { value: 1e-3, symbol: 'm' },
      { value: 1e-6, symbol: 'µ' },
      { value: 1e-9, symbol: 'n' },
      { value: 1e-12, symbol: 'p' }
  ];

  const item = units.find(unit => Math.abs(number) >= unit.value);
  const formattedNumber = (number / (item?.value as number)).toFixed(2);

  return `${formattedNumber}${item?.symbol}`;
}
