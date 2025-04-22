import { CategoriesListQueryData } from '@/database/categories/categories-list-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, Ref, useImperativeHandle, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { CategoryPicker, CategoryPickerValue } from './category-picker';

const categories: CategoriesListQueryData = [
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 2,
    name: 'Category 2',
  },
];

interface WrapperProps {
  ref: Ref<Set<number>>;
  initialState?: CategoryPickerValue;
}

const Wrapper = ({ initialState = new Set(), ref }: WrapperProps) => {
  const [state, setState] = useState<CategoryPickerValue>(initialState);

  useImperativeHandle(ref, () => state, [state]);

  return (
    <CategoryPicker
      categories={categories}
      selectedCategories={state}
      onSelectedCategoriesChange={setState}
    />
  );
};

const setup = (initialState?: CategoryPickerValue) => {
  const user = userEvent.setup();
  const wrapperRef = createRef<CategoryPickerValue>();
  const renderResult = render(
    <Wrapper
      ref={wrapperRef}
      initialState={initialState}
    />,
  );

  return {
    async openDropdown() {
      await user.click(renderResult.getByTestId('category-picker-dropdown'));
    },
    async clickCategoryByName(name: string) {
      await user.click(renderResult.getByText(name, { exact: false }));
    },
    getSelectedCategories() {
      return wrapperRef.current;
    },
    renderResult,
  };
};

describe('CategoryPickerComponent', () => {
  it('it should select a category when its name is clicked', async () => {
    const { openDropdown, clickCategoryByName, getSelectedCategories } =
      setup();
    const [{ id, name }] = categories;

    expect(getSelectedCategories()).not.toContain(id);

    await openDropdown();
    await clickCategoryByName(name);

    expect(getSelectedCategories()).toContain(id);
  });

  it('should deselect a category when its name is clicked', async () => {
    const [{ id, name }] = categories;
    const { openDropdown, clickCategoryByName, getSelectedCategories } = setup(
      new Set([id]),
    );

    expect(getSelectedCategories()).toContain(id);

    await openDropdown();
    await clickCategoryByName(name);

    expect(getSelectedCategories()).not.toContain(id);
  });

  it('should stay open after a category was selected', async () => {
    const { openDropdown, clickCategoryByName, renderResult } = setup();
    const [{ name }] = categories;

    await openDropdown();
    await clickCategoryByName(name);

    expect(renderResult.getByText(name, { exact: false })).toBeInTheDocument();
  });
});
