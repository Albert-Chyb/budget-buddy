import { Dispatch, SetStateAction } from 'react';

export const useMultipleSelection = <T>(
  state: Set<T>,
  setState: Dispatch<SetStateAction<Set<T>>>,
) => {
  return {
    handleCheckedChange(isChecked: boolean, item: T) {
      setState((prev) => {
        const copy = new Set(prev);

        if (isChecked) copy.add(item);
        else copy.delete(item);

        return copy;
      });
    },
    isChecked(item: T) {
      return state.has(item);
    },
  };
};
