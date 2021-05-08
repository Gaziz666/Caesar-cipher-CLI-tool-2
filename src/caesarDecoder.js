import { actions } from './constants.js';

let isCapitalize = false;
const isLetter = (letterChar) => {
  if (letterChar >= 65 && letterChar <= 90) {
    isCapitalize = true;
    return true;
  }
  if (letterChar >= 97 && letterChar <= 122) {
    isCapitalize = false;
    return true;
  }

  return false;
};

const charCodeOfA = 65;
const charCodeOfa = 97;

const caesarEncode = (text, shift, actionType) => {
  let step = Number(shift) % 26;
  if (actionType === actions.decode) {
    step = -step;
  }
  if (step < 0) {
    step = 26 + step;
  }
  const textArr = text.split('');

  const result = textArr
    .map((item) => {
      const char = item.charCodeAt();

      if (isLetter(char)) {
        if (isCapitalize) {
          return String.fromCharCode(
            ((char - charCodeOfA + step) % 26) + charCodeOfA,
          );
        }
        return String.fromCharCode(
          ((char - charCodeOfa + step) % 26) + charCodeOfa,
        );
      }
      return item;
    })
    .join('');

  return result;
};

export { caesarEncode };
