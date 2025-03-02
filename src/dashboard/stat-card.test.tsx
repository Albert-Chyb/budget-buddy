import { Currency } from '@/helpers/currency';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatCard } from './stat-card';

describe('StatCardComponent', () => {
  it('should display children', () => {
    const renderResult = render(<StatCard value={new Currency(1)}>a</StatCard>);

    expect(renderResult.queryByText('a')).toBeInTheDocument();
  });

  it('should display the value', () => {
    const value = new Currency(7845);
    const renderResult = render(<StatCard value={value} />);

    expect(
      renderResult.queryByText(value.toDecimalString(), { exact: false }),
    ).toBeInTheDocument();
  });

  it('should display the percentage change between the base value and the value', () => {
    const value = new Currency(10);
    const baseValue = new Currency(20);
    const renderResult = render(
      <StatCard
        value={value}
        baseValue={baseValue}
      />,
    );

    expect(
      renderResult.queryByText('-50%', { exact: false }),
    ).toBeInTheDocument();
  });
});
