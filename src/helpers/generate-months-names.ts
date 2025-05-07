/** Generates months names for the given locale */
export const generateMonthsNames = (locale: string) =>
  Array.from({ length: 12 }, (_v, index) =>
    new Intl.DateTimeFormat(locale, {
      month: 'long',
    }).format(new Date(2025, index)),
  );
