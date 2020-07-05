import { intersection } from 'lodash';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

/**
 * Produces a getter object. Mimics Vuex Getter Structure
 * @param {{[string]: Function}} transformations Transformation Functions Dictionary 
 */
export const getter = (transformations: { [x: string]: (arg0: any) => any; }) => (state: any) => {
  return R.keys(transformations).reduce((accm, cur) => {
    accm[cur] = transformations[cur](state);
    return accm;
  }, {});
}

/** Picks from the object and rename the properties by the keyMap  */
export const pickAs = (keyMap) => {
  return R.pipe(
    R.pick(R.keys(keyMap)),
    RA.renameKeys(keyMap)
  );
};

/** Reverses the JSON objects key-value pairs. Keys becomes values, values becomes keys */
export const reverseKeyValue = (obj: { [x: string]: any; }) => R.keys(obj).reduce((accumulator, cur) => ({
  ...accumulator,
  [obj[cur]]: cur
}), {});

export const rejectNotString = (value: string | any[]) => {
  if (!value) {
    throw Error('Provide a non-falsy string');
  } else if (typeof value === 'string') {
    if (value.length > 0) {
      return value;
    } else {
      throw Error('Provide a non-empty string');
    }
  } else {
    throw Error('Provide a valid string');
  }
}

/** Return the value in string format - If not possible returns empty string */
export const ensureString = (value: any, defaultString = '') => {
  if (value) {
    return `${value}`;
  } else {
    return defaultString;
  }
}

/** Ensures that all the values of the obejct are string or atleast the default value */
export const ensureStringObject = (obj: { [x: string]: any; }, defaultString = '') => {
  return R.keys(obj)
    .map(key => [key, ensureString(obj[key], defaultString)])
    .reduce((accm, cur) => {
      accm[cur[0]] = cur[1];
      return accm;
    }, {});
}

/** Converts the array of keyvalues to Object */
export const keyValuesToObj = (keyValueArray: any[]) => {
  return keyValueArray.reduce((accm: { [x: string]: any; }, cur: any[]) => {
    accm[cur[0]] = cur[1];
    return accm;
  }, {});
}


/** Split the first half of the string - by space*/
export const firstHalfString = (string: string, delimiter = ' ') => {
  return string && string.split(delimiter) && string.split(delimiter)[0];
}

/** Abbreviate the string limited by MaxLength */
export const abbreviate = (string = '', maxLength = 6) => {
  if (string.length <= maxLength) {
    return string;
  } else {
    const words = string.split(' ');
    let initials = words.map(w => R.head(w));
    if (initials.length > maxLength) {
      return initials.slice(0, maxLength).join('');
    } else {
      const maxIn = maxLength / words.length;
      const extra = maxLength % words.length;
      initials = words.map(w => '');
      let i = 0, WC = words.map(w => 0);
      while (i < maxLength) {
        words.map((w, index) => {
          if (w[WC[index]] && i < maxLength) {
            initials[index] += WC[index] == 0 ? R.toUpper(w[WC[index]]) : R.toLower(w[WC[index]]);
            WC[index]++;
            i++;
          }
        })
      }
    }
    return initials.join('');
  }
}

/** Returns a random number between max and min INCLUSIVE */
export const random = (max = 100, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate a new ID from the list of IDs. The ID is negative - to detect new set of IDs. Pass in negative=false for getting a positive next ID */
export const generateNextId = (numbers: Array<any> = [], negative = true) => {
  if (numbers?.length == 0) {
    numbers = [0];
  }
  if (numbers?.length > 0) {
    if (typeof numbers[0] != 'number' || isNaN(numbers[0])) {
      throw Error('Pass in a Array of Number in the GenerateNextId Function');
    }
  }

  const max = negative ? Math.max(...numbers.map(Math.abs)) : Math.max(...numbers);
  const newMax = (Math.abs(max) + 1) * (negative ? -1 : 1);
  return newMax;
}
/** Detects if the value is negative number or not */
export const isNegative = (value: number) => {
  if (!isNaN(value)) {
    if (Math.sign(value) === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
/** Cycle the members of the Array  */
export const cycleArrayNext = (arr: any[], val: number) => {
  arr = arr.sort((a: number, b: number) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (val < arr[i]) {
      return arr[i];
    }
  }
  return arr[0];
}
