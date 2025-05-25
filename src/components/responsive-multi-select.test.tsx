import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, Ref, useImperativeHandle, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  ResponsiveMultiSelect,
  ResponsiveMultiSelectOption,
} from './responsive-multi-select';

vi.mock('@/components/drawer', () => ({
  Drawer: vi.fn().mockImplementation(({ children }) => children),
  DrawerContent: vi.fn().mockImplementation(({ children }) => children),
  DrawerDescription: vi.fn().mockImplementation(({ children }) => children),
  DrawerHeader: vi.fn().mockImplementation(({ children }) => children),
  DrawerTitle: vi.fn().mockImplementation(({ children }) => children),
  DrawerTrigger: vi.fn().mockImplementation(({ children }) => children),
}));

const buildOptionLabelText = (value: number) => `Option ${value}`;

const OPTIONS: ResponsiveMultiSelectOption<number>[] = [1, 2].map((value) => ({
  value,
  label: buildOptionLabelText(value),
}));

interface WrapperProps {
  ref: Ref<Set<number>>;
  isMobile: boolean;
  initialSelection: Set<number>;
}

const Wrapper = ({ ref, isMobile, initialSelection }: WrapperProps) => {
  const [selection, setSelection] = useState(initialSelection);

  useImperativeHandle(ref, () => selection, [selection]);

  return (
    <ResponsiveMultiSelect
      title='Title'
      description='Description'
      isMobile={isMobile}
      selection={selection}
      onSelectionChange={setSelection}
      options={OPTIONS}
    >
      <button data-testid='trigger-btn'>Trigger</button>
    </ResponsiveMultiSelect>
  );
};

const setup = (isMobile: boolean, initialSelection = new Set<number>()) => {
  const user = userEvent.setup();
  const selectionRef = createRef<Set<number>>();
  const renderResult = render(
    <Wrapper
      ref={selectionRef}
      isMobile={isMobile}
      initialSelection={initialSelection}
    />,
  );

  return {
    getSelection: () => {
      if (!selectionRef.current)
        throw new Error('The selection state should not be null');

      return selectionRef.current;
    },
    async clickOption(option: ResponsiveMultiSelectOption<number>) {
      const optionLabel = buildOptionLabelText(option.value);

      if (isMobile) await user.click(renderResult.getByLabelText(optionLabel));
      else
        await user.click(renderResult.getByText(optionLabel, { exact: false }));
    },
    async clickTrigger() {
      await user.click(renderResult.getByText('Trigger'));
    },
  };
};

describe('ResponsiveMultiSelect', () => {
  describe('mobile view', () => {
    it('should deselect an item when it is clicked', async () => {
      const [option] = OPTIONS;
      const { clickOption, getSelection } = setup(
        true,
        new Set([option.value]),
      );

      await clickOption(option);

      expect(getSelection()).not.toContain(option.value);
    });

    it('should select an item when it is clicked', async () => {
      const { clickOption, getSelection } = setup(true);
      const [option] = OPTIONS;

      await clickOption(option);

      expect(getSelection().size).toBe(1);
      expect(getSelection()).toContain(option.value);
    });
  });

  describe('desktop view', () => {
    it('should deselect an item when it is clicked', async () => {
      const [option] = OPTIONS;
      const { clickOption, getSelection, clickTrigger } = setup(
        false,
        new Set([option.value]),
      );

      await clickTrigger();
      await clickOption(option);

      expect(getSelection()).not.toContain(option.value);
    });

    it('should select an item when it is clicked', async () => {
      const { clickOption, getSelection, clickTrigger } = setup(false);
      const [option] = OPTIONS;

      await clickTrigger();
      await clickOption(option);

      expect(getSelection().size).toBe(1);
      expect(getSelection()).toContain(option.value);
    });

    it('should stay opened after an item is clicked', async () => {
      const { clickOption, clickTrigger } = setup(false);
      const [option] = OPTIONS;

      await clickTrigger();
      await clickOption(option);

      expect(
        screen.getByText(buildOptionLabelText(option.value)),
      ).toBeInTheDocument();
    });
  });
});
