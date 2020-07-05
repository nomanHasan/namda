export const parseNumber = (value, defaultValue = Number.MIN_VALUE, format, min, max) => {
  return Number(value) || defaultValue;
}

export const getIntegerRange = (start = 0, end = 0, step = 1) => {
  if (start > end) {
    return [];
  }

  let retArray: Array<any> = [], cur = start;

  while (cur <= end) {
    retArray.push(cur);
    cur += step;
  }

  return retArray;
}

export const pixelifyNumber = (value, defaultValue = 'auto') => {
  if (value) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return value + 'px';
    }
  } else {
    return defaultValue;
  }
}

/** Calculate the percentage of the first argument. This is a curried function */
export const calcPercent = (percent) => value => {
  percent = +percent;
  value = +value;

  if (!isNaN(percent) && !isNaN(value)) {
    return (percent * value) / 100;
  } else {
    return 0;
  }
}

export const decimalFormat = to => data => {
  return parseFloat(data).toFixed(to)
}