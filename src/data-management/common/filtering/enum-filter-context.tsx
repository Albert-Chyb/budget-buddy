import { createContext, PropsWithChildren, useContext } from 'react';

export interface EnumFilterContextValue {
  _isInsideProvider: boolean;
  id: string;
}

const DEFAULT_VALUE: EnumFilterContextValue = {
  _isInsideProvider: false,
  id: '',
};

const enumFilterContext = createContext(DEFAULT_VALUE);

export const useEnumFilterContext = () => {
  const value = useContext(enumFilterContext);

  if (!value._isInsideProvider)
    throw new Error('Enum filter context can only be used inside its provider');

  return value;
};

export interface EnumFilterContextProviderProps extends PropsWithChildren {
  id: string;
}
export const EnumFilterContextProvider = ({
  id,
  children,
}: EnumFilterContextProviderProps) => {
  const { Provider } = enumFilterContext;
  const value: EnumFilterContextValue = {
    _isInsideProvider: true,
    id,
  };

  return <Provider value={value}>{children}</Provider>;
};
