import { getByTestId, queryByTestId, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useIsMobile } from './is-mobile';
import { ResponsiveButton, ResponsiveButtonProps } from './responsive-button';

vi.mock('@/data-management/common/is-mobile', async () => ({
  useIsMobile: vi.fn(),
}));

const setupTest = (
  { label = '' }: Partial<Pick<ResponsiveButtonProps, 'label'>>,
  isMobile: boolean,
) => {
  vi.mocked(useIsMobile).mockReturnValueOnce(isMobile);
  const { container } = render(
    <ResponsiveButton
      icon={<span data-testid='responsive-button-icon' />}
      label={label}
    />,
  );
  const button = getByTestId(container, 'responsive-button');
  const icon = queryByTestId(button, 'responsive-button-icon');

  return {
    container,
    button,
    icon,
  };
};

describe('ResponsiveButtonComponent', () => {
  it('should display the label inside a button in desktop view', () => {
    const label = 'a';
    const { button } = setupTest({ label }, false);

    expect(button).toHaveTextContent(label);
  });

  it('should render a button with aria-label attribute set to the label in mobile view', () => {
    const label = 'a';
    const { button } = setupTest({ label }, true);

    expect(button).toHaveAttribute('aria-label', label);
  });

  it('should render an icon inside the button in mobile view', () => {
    const { icon } = setupTest({}, true);

    expect(icon).toBeInTheDocument();
  });
});
