export const getDottedString = (str: string, numCharacters: number) => {
  // if numCharacters > 97, return substring + dots
  if (str.length > numCharacters) {
    return `${str.substring(0, numCharacters)}... `;
  }
  return str;
};
