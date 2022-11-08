export const theme = {
  color: {
    purple: '#8661de',
    blue: '#00bac7',
    gray: '#f6f6f6',
    green: '#07b495',
    lightGreen: '#99ecdd',
    darkGray: '#54595d',
  },
  boxShadow: '0 4px 12px rgba(0 0 0 / 10%)',
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
