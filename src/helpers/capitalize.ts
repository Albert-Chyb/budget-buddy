export const capitalize = ([first, ...rest]: string) => {
  if (!first) return '';

  return first.toUpperCase().concat(...rest);
};
