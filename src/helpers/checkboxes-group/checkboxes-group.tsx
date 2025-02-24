import { createContext, PropsWithChildren, useContext } from 'react';

// Context setup
export type CheckedOptions = unknown[] | undefined;
export type CheckedOptionsUpdater =
  | CheckedOptions
  | ((checkedOptions: CheckedOptions) => CheckedOptions);
export type CheckboxesGroupContextValue = {
  checkedOptions: CheckedOptions;
  setCheckedOptions: (updater: CheckedOptionsUpdater) => void;
};
const DEFAULT_VALUE: CheckboxesGroupContextValue = {
  checkedOptions: [],
  setCheckedOptions: () => {},
};
const Context = createContext<CheckboxesGroupContextValue>(DEFAULT_VALUE);

// Providing and consuming utilities
export interface CheckboxesGroupProps extends PropsWithChildren {
  checkedOptions: CheckedOptions;
  onCheckedOptionsChange: (updater: CheckedOptionsUpdater) => void;
}
export const CheckboxesGroup = (props: CheckboxesGroupProps) => {
  const { children, checkedOptions, onCheckedOptionsChange } = props;
  return (
    <Context.Provider
      value={{
        checkedOptions,
        setCheckedOptions: onCheckedOptionsChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};
const useCheckboxesGroup = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Checkboxes group context can only be used inside its provider. Did you forget to use <CheckboxesGroup/> component ?',
    );
  return context;
};

export const useCheckboxesGroupOption = (value: unknown) => {
  const { checkedOptions, setCheckedOptions } = useCheckboxesGroup();
  const check = () => setCheckedOptions((prev) => [...(prev ?? []), value]);
  const uncheck = () =>
    setCheckedOptions((prev) =>
      (prev ?? []).filter((option) => option !== value),
    );
  const isChecked = (checkedOptions ?? []).includes(value);

  return {
    check,
    uncheck,
    isChecked,
  };
};
