import numbro from 'numbro';

numbro.registerLanguage({
  languageTag: 'en-US',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: () => '',
  currency: {
    symbol: 'Rp',
    position: 'prefix',
    code: 'EUR',
  },
});

export const unFormatNumbro = (value) => numbro.unformat(value);

export const formatNumbro = (value) =>
  numbro(value).formatCurrency({
    thousandSeparated: true,
    spaceSeparated: true,
    mantissa: 2,
    optionalMantissa: true,
  });
