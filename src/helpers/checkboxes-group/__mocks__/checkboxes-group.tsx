import type { CheckboxesGroupProps, CheckedOptions } from '../checkboxes-group';

const getNextOptions = (element: HTMLElement): CheckedOptions => {
  const nextOptions = element.getAttribute('data-next-options');
  if (nextOptions) return JSON.parse(nextOptions);
};

export const CheckboxesGroup = ({
  checkedOptions,
  onCheckedOptionsChange,
}: CheckboxesGroupProps) => {
  return (
    <div
      data-testid='checkboxes-group-mock'
      data-checked-options={JSON.stringify(checkedOptions)}
      onClick={($event) => {
        onCheckedOptionsChange(getNextOptions($event.currentTarget));
      }}
    />
  );
};
