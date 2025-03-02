import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Currency } from '@/helpers/currency';
import { APP_LOCALE } from '@/localization';
import { PropsWithChildren } from 'react';

export interface StatCardProps extends PropsWithChildren {
  value: Currency;
  baseValue?: Currency;
  negativeDeltaIsBetter?: boolean;
}

export const StatCard = ({
  value,
  children,
  baseValue,
  negativeDeltaIsBetter,
}: StatCardProps) => {
  const delta = baseValue ? value.divide(baseValue).toDecimal() - 1 : undefined;

  return (
    <Card>
      <CardHeader className='text-sm font-medium pb-2'>
        <CardTitle>{children}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='text-2xl font-bold'>{value.toString()}</div>
        {delta && (
          <p
            className={`text-xs ${getDeltaTextColorClass(delta, negativeDeltaIsBetter)}`}
          >
            {deltaFormatter.format(delta)} vs poprzedni okres
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const getDeltaTextColorClass = (
  delta: number,
  negativeDeltaIsBetter: StatCardProps['negativeDeltaIsBetter'],
) => {
  if (negativeDeltaIsBetter) delta *= -1;

  if (delta < 0) return 'text-destructive';
  if (delta > 0) return 'text-green-500';

  return 'text-foreground';
};

const deltaFormatter = new Intl.NumberFormat(APP_LOCALE, {
  style: 'percent',
  signDisplay: 'exceptZero',
});
