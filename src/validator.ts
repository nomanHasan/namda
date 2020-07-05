import * as R from 'ramda';

/** Checks if the argument is a valid string having the minimum Length of second argument */
export const validString = (minLength = 1) => (str) => {
  return str && typeof str === 'string' && str.length >= minLength;
};

/** Validates if all the values of the object is validated by the validator Function */
export const allValid = (validatorFunc = validString(1)) => (validationObject = {}) => {
  const validations =  R.keys(validationObject).map((key) => [key, validatorFunc(validationObject[key])]);
  if (validations.map(([key, v]) => v).every(R.identity)) {
    return {
      valid: true
    };
  } else {
    return {
      valid: false,
      invalid: validations.filter(([key, v]) => !v).map(([key, v]) => key)
    }
  }
}



/** Returns true if all the arguments are valid strings */
export const allValidString = allValid(validString(1));
