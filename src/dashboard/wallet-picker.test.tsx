import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, Ref, useImperativeHandle, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { WalletPicker, WalletPickerProps } from './wallet-picker';

const WALLETS: WalletPickerProps['wallets'] = [
  {
    id: 1,
    name: 'wallet-a',
  },
  {
    id: 2,
    name: 'wallet-b',
  },
];

interface WrapperProps {
  ref: Ref<Set<number>>;
  initiallySelectedWallets?: Set<number>;
}

const Wrapper = ({
  ref,
  initiallySelectedWallets = new Set<number>(),
}: WrapperProps) => {
  const [value, setValue] = useState(initiallySelectedWallets);

  useImperativeHandle(ref, () => value, [value]);

  return (
    <WalletPicker
      wallets={WALLETS}
      selectedWallets={value}
      onSelectedWalletsChange={setValue}
    />
  );
};

const setup = (initiallySelectedWallets?: Set<number>) => {
  const user = userEvent.setup();
  const selectedWalletsRef = createRef<Set<number>>();
  const renderResult = render(
    <Wrapper
      ref={selectedWalletsRef}
      initiallySelectedWallets={initiallySelectedWallets}
    />,
  );

  return {
    async openPicker() {
      await user.click(renderResult.getByTestId('wallet-picker-trigger'));
    },
    async clickWalletByName(name: string) {
      await user.click(renderResult.getByText(name, { exact: false }));
    },
    getSelectedValues() {
      return selectedWalletsRef.current;
    },
    renderResult,
  };
};

describe('WalletPicker', () => {
  it('should select a wallet when its name is clicked', async () => {
    const { openPicker, clickWalletByName, getSelectedValues } = setup();
    const { id, name } = WALLETS[0];

    await openPicker();
    await clickWalletByName(name);

    expect(getSelectedValues()).toContain(id);
  });

  it('should deselect a wallet when its name is clicked', async () => {
    const { id, name } = WALLETS[0];
    const { openPicker, clickWalletByName, getSelectedValues } = setup(
      new Set([id]),
    );

    await openPicker();
    await clickWalletByName(name);

    expect(getSelectedValues()).not.toContain(id);
  });

  it('should keep the picker opened after a wallet is clicked', async () => {
    const { openPicker, clickWalletByName, renderResult } = setup();

    await openPicker();
    await clickWalletByName(WALLETS[0].name);

    expect(
      renderResult.queryByText(WALLETS[0].name, { exact: false }),
    ).toBeInTheDocument();

    expect(
      renderResult.queryByText(WALLETS[1].name, { exact: false }),
    ).toBeInTheDocument();
  });
});
