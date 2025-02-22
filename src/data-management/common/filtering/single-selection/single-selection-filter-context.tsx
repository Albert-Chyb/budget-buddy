import { createContext, PropsWithChildren, useContext } from 'react';

export interface SingleSelectionFilterContextValue {
  _isInsideProvider: boolean;
  id: string;
}

const DEFAULT_VALUE: SingleSelectionFilterContextValue = {
  _isInsideProvider: false,
  id: '',
};

const context = createContext(DEFAULT_VALUE);

export const useSingleSelectionFilterContext = () => {
  const value = useContext(context);

  if (!value._isInsideProvider)
    throw new Error(
      'Single selection filter context can only be used inside its provider',
    );

  return value;
};

export interface SingleSelectionFilterContextProviderProps
  extends PropsWithChildren {
  id: string;
}
export const SingleSelectionFilterContextProvider = ({
  id,
  children,
}: SingleSelectionFilterContextProviderProps) => {
  const { Provider } = context;
  const value: SingleSelectionFilterContextValue = {
    _isInsideProvider: true,
    id,
  };

  return <Provider value={value}>{children}</Provider>;
};
