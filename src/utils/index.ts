export const getDottedString = (str: string, numCharacters: number) => {
  // if numCharacters > 97, return substring + dots
  try {
    if (str.length > numCharacters) {
      return `${str.substring(0, numCharacters)}... `;
    }
  } catch (error) {
    console.trace(error);
  }
  return str;
};
