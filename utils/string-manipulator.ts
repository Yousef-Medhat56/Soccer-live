//this file contains methods related to manipulating strings

//remove specific part from a string
export const removePartfromStr = (
  value: String,
  removedPart: string | RegExp
) => {
  return value.replace(removedPart, "");
};
