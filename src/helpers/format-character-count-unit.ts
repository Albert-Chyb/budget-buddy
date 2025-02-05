import { APP_LOCALE } from '@/localization.ts';

const formatter = new Intl.PluralRules(APP_LOCALE);

export const formatCharacterCountUnit = (count: number) => {
  switch (formatter.select(count)) {
    case 'one':
      return 'znak'; // Singular case in Polish
    case 'few':
      return 'znaki'; // Few case in Polish
    default:
      return 'znaków'; // Plural case in Polish
  }
};
