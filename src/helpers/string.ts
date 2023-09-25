export const getImagePlaceholder = (name: string): string =>
  name
    .trim()
    .match(/(^\w)|(?<=\s)(\w)(?=\w+$)/g)
    ?.join('')
    .toLocaleUpperCase() || 'NA';

export const revertCamelCase = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').trim();
