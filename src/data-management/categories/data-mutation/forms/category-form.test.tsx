import {
  NAME_TOO_BIG_MSG,
  NAME_TOO_SHORT_MSG,
  TYPE_ID_REQUIRED_MSG,
} from '@/data-management/categories/data-mutation/forms/category-form-errors-messages.ts';
import {
  CategoryForm,
  CategoryFormProps,
} from '@/data-management/categories/data-mutation/forms/category-form.tsx';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/category-form-schema.ts';
import { NAME_MAX_LENGTH } from '@/database/categories/category-schema.ts';
import {
  getByTestId,
  queryByTestId,
  queryByText,
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const generateTooBigText = (maxSize: number) =>
  new Array(maxSize + 1).fill('a').join('');

const setupFnFactory = () => {
  return ({
    onSubmit = () => {},
    categoryTypes = [],
    categoryColors = [],
    isPending = false,
    category = undefined,
  }: Partial<CategoryFormProps> = {}) => {
    const user = userEvent.setup();
    const { container } = render(
      <CategoryForm
        onSubmit={onSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
        isPending={isPending}
        category={category}
      />,
    );
    const nameInput = getByTestId(container, 'category-name-input');
    const categoryTypeInput = getByTestId(container, 'category-type-toggle');
    const submitBtn = getByTestId(container, 'category-form-submit-btn');

    return {
      user,
      container,
      nameInput,
      submitBtn,
      categoryTypeInput,
    };
  };
};

describe('CategoryFrom', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should call onSubmit callback with a form value', async () => {
    const spy = vi.fn();
    const fakeFormValue: CategoryFormValue = {
      name: 'a',
      color_id: null,
      type_id: 1,
    };
    const { submitBtn, user } = setup({
      onSubmit: spy,
      category: fakeFormValue,
    });

    await user.click(submitBtn);

    expect(spy).toHaveBeenCalledExactlyOnceWith(fakeFormValue);
  });

  describe('CategoryNameFormField', () => {
    it('should display error message when submitted with too small text', async () => {
      const { submitBtn, container, user, nameInput } = setup();

      await user.clear(nameInput);
      await user.click(submitBtn);

      expect(queryByText(container, NAME_TOO_SHORT_MSG)).toBeInTheDocument();
    });

    it('should display error message when submitted with too big text', async () => {
      const { submitBtn, container, user, nameInput } = setup();

      await user.type(nameInput, generateTooBigText(NAME_MAX_LENGTH));
      await user.click(submitBtn);

      expect(queryByText(container, NAME_TOO_BIG_MSG)).toBeInTheDocument();
    });
  });

  describe('CategoryTypeFormField', () => {
    it('should display error message when submitted without a selected value', async () => {
      const { submitBtn, container, user } = setup();

      await user.click(submitBtn);

      expect(queryByText(container, TYPE_ID_REQUIRED_MSG)).toBeInTheDocument();
    });

    it('should render with category type options', () => {
      const typeA = { name: 'a', is_expense: false, id: 1 };
      const typeB = { name: 'b', is_expense: true, id: 2 };
      const { categoryTypeInput } = setup({
        categoryTypes: [typeA, typeB],
      });

      const typeAOption = queryByTestId(
        categoryTypeInput,
        `category-type-toggle-option-${typeA.id}`,
      );
      const typeBOption = queryByTestId(
        categoryTypeInput,
        `category-type-toggle-option-${typeB.id}`,
      );

      expect(typeAOption).toBeInTheDocument();
      expect(typeBOption).toBeInTheDocument();
    });
  });
});
