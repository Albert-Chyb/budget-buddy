type ResetFlag = string;
const DEFAULT_RESET_FLAG = '' as const;

export const inputValueAdapter = <TInput>(
  convertToInputValue: (value: TInput) => string,
  convertFromInputValue: (value: string) => TInput,
  resetFlag: ResetFlag = DEFAULT_RESET_FLAG,
) => {
  const toInputValue = (value: TInput | null) => {
    const hasValue = value !== null && value !== resetFlag;
    if (hasValue) return convertToInputValue(value);

    return '';
  };

  const fromInputValue = (htmlValue: string): TInput | null => {
    const hasValue = htmlValue !== '';
    if (hasValue) return convertFromInputValue(htmlValue);

    return null;
  };

  return {
    toInputValue,
    fromInputValue,
    resetFlag,
  };
};

export const recordIdValueAdapter = inputValueAdapter(String, Number, 'no-id');
