export const stripDateTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isDateInRange = (
  min: Date | undefined,
  max: Date | undefined,
  target: Date,
) => {
  const targetWithoutTime = stripDateTime(target).getTime();
  const definedMin = min ? stripDateTime(min).getTime() : -Infinity;
  const definedMax = max ? stripDateTime(max).getTime() : Infinity;

  return targetWithoutTime >= definedMin && targetWithoutTime <= definedMax;
};
