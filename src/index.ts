// import * as S from 'sanctuary';
import * as D from 'date-fns';
import * as R from 'ramda';
import * as qs from 'querystring';

export * from './clipboard';
export * from './errors';
export * from './encoder';
export * from './validator';
export * from './color';
export * from './jsonx';
export * from './inspect';
export * from './string';
export * from './number';
export * from './responsive';

/** Creates an UUID version4 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/** Create a MailTo Href from the arguments */
export function createMailHref({
  subject,
  body,
  mails = []
}) {
  return `mailto:${
    mails.join(',')
    }?${qs.stringify({
      subject,
      body
    })}`;
};

/** Opens a Mail window in a new window */
export const openMailWindow = (mailToLink) => {
  window.open(
    mailToLink,
    '_blank'
  );
}

// Open a window
export const openWindow = (url, name = 'New Window', height = 200, width = 150) => {
  return window.open(url, name, `height=${height},width=${width}`);
}

// Download a File By Creating Link
export const downloadFile = url => {
  const tempLink = document.createElement('a');
  // tempLink.target = '_blank';
  tempLink.href = url;
  tempLink.click();
  tempLink.remove();
}

// Open mail window by passing the href object
export const sendMail = ({
  subject,
  body,
  mails = []
}) => {
  openMailWindow(createMailHref({
    subject,
    body,
    mails
  }));
}

/** Execute asynchronous code waiting for the animation. Average time is 200 ms */
export function waitForAnimation(f, delay = 200) {
  setTimeout(f, delay);
}

/** Execute asynchronous code waiting for the animation. Average time is 200 ms */
export function waitForBackend(f, delay = 500) {
  setTimeout(f, delay);
}

/** Wait by the milliseconds time. */
export const wait = (time = 1) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

/** Capitalize the first letter of the word */
export const capitalizeFirst = R.ifElse(
  R.isNil,
  R.identity,
  R.compose(
    R.join(''),
    R.juxt([R.compose(R.toUpper, R.head), R.tail])
  )
);

/** Log the value - useful in tracing piped functions */
export const trace = (v) => {
  console.log(v);
  return v;
}

/** Add & removes from the Set */
export const addRemoveSet = (operation = true, set = new Set(), selected) => {
  // console.log("Log: addRemoveSet -> set", Array.from(set))
  set = new Set(set);

  if (operation === true) {
    if (!set.has(selected)) {
      set.add(selected);
      // console.log("Log: addRemoveSet -> set -> add", set)
    }
  } else if (operation === false) {
    if (set.has(selected)) {
      set.delete(selected);
      // console.log("Log: addRemoveSet -> set -> delete", set)
    }
  } else if (operation === 'toggle') {
    if (!set.has(selected)) {
      set.add(selected);
    } else {
      set.delete(selected);
    }
  }
  // console.log("Log: addRemoveSet -> set -> return", set)
  return Object.freeze(set);
}


const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function formatBytes(x) {
  let l = 0, n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l)
    n = n / 1024;
  return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}


export const preventAndStop = (event) => {
  if (!event) {
    return;
  }

  if (event.preventDefault) {
    event.preventDefault();
  }
  if (event.stopPropagation) {
    event.stopPropagation();
  }
}



/** Returns the absolute position of the element relative to the document */
export function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// const a = [12,31231,23,12,312,423,412];

// console.log(S.head ([]));


export const startOfCalendar = (date, option = {}) =>
  D.startOfWeek(D.startOfMonth(date), option);


export const getCalendarGrid = (date, options = {
  weekStartsOn: 0,
  dayPerWeek: 7,
  weekCount: 6
}) => {
  if (!D.isValid(date)) {
    throw Error('Please pass a valid starting Date');
  }
  let start = startOfCalendar(date, {
    weekStartsOn: options.weekStartsOn
  });
  return R.range(1, options.weekCount + 1).map(w => {
    return R.range(1, options.dayPerWeek + 1).map(d => {
      const temp = new Date(start);
      start = D.addDays(start, 1);
      return temp;
    });
  });
};


export const atMost = (atMost = Number.MAX_SAFE_INTEGER, value) => {
  if (value < atMost) {
    return value;
  } else {
    return atMost;
  }
}

export const within = (max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER, value, defaultValue = 0) => {
  if (value < max && value > min) {
    return value;
  } else if (value >= max) {
    return max;
  } else if (value <= min) {
    return min;
  } else {
    return defaultValue;
  }
}

function padZero(str, len?: any) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r: number | string = parseInt(hex.slice(0, 2), 16),
    g: number | string = parseInt(hex.slice(2, 4), 16),
    b: number | string = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 145
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

export const toSnakeCase = (string) => {
  return string && string.replace(/([A-Z])/g, e => `_${e.toLowerCase()}`)
}

export const sentenceToSnakeCase = string => {
  return string && string.replace(/ /g, '_');
}

export const snakeCaseToWords = (string) => {
  if (!string) {
    return '';
  }
  return string.replace(/_([a-z])/g, " $1").split(' ').map(e => {
    return R.head(e).toUpperCase() + e.slice(1);
  }).join(' ')
}

/** Turns snake case into Camel Case */
export const snakeToCamelCase = (string) => {
  if (!string) {
    return '';
  }
  return string.replace(/_(\w)/g, (head) => {
    return head[1].toUpperCase();
  });
};

export const isNotEmptyString = (string) => {
  string = string && string.toString();
  return R.is(String, string) && !R.isEmpty(string);
}


// Google Maps Marker and Info Window Functions

const markerInfoWindows = 'markerInfoWindows';
export const registerMarkerAndInfoWindow = (component, map, markers, infoWindows, bounceAnimation) => {

  component[markerInfoWindows] = R.zip(markers, infoWindows);

  component[markerInfoWindows].map(([marker, infoWindow]) => {
    marker.addListener('click', e => toggleBounce(component, map, marker, infoWindow, bounceAnimation));
  });
}

// Add Event listener to the markers
export const toggleBounce = (component, map, marker, infoWindow, bounceAnimation) => {
  infoWindow.open(map, marker);

  component[markerInfoWindows].map(([mk, iw]) => {
    if (iw != infoWindow) {
      iw.close();
    }
    if (mk !== marker) {
      mk.setAnimation(null);
    }
  });

  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(bounceAnimation);
  }
}


export const getScrollDimensionY = (element) => {
  const height = element.getBoundingClientRect().height;
  const scrollHeight = element.scrollHeight;
  const scrollTop = element.scrollTop;

  return {
    height,
    scrollHeight,
    scrollTop,
    get maxScrollTop() {
      return scrollHeight - height;
    },
    get scrollPercent() {
      return scrollTop / (scrollHeight - height) * 100;
    }
  };
}
export function setInputTimer(domElm, callback) {
  let lastTime = new Date().getTime();
  domElm.setAttribute("last-edited", lastTime);
  let timeOutId = domElm.getAttribute("timeout-id");
  if (timeOutId) {
    clearTimeout(timeOutId);
  }
  timeOutId = setTimeout(callback, 300);
  domElm.setAttribute("timeout-id", timeOutId);
}
// Return the Dropdown options from full data (arrayOfObjects)
export const getDropdownOptions = (arrayOfObjects, textProperty, valueProperty) => {
  return arrayOfObjects
    ? arrayOfObjects.map(e => ({
      text: e[textProperty],
      value: e[valueProperty]
    }))
    : [];
}

/** Sort the object by the keys */
// @ts-ignore
export const sortObject = R.pipe(R.toPairs, R.sortBy(R.prop('0')), R.map(([key, value]) => {
  if (R.is(Object, value) && !R.is(Array, value)) {
    return [key, sortObject(value)];
  } else {
    return [key, value];
  }
}), R.fromPairs);


/** Debounce the function by wait milliseconds. Third argument for immediate execution  */
export function debounceFunction(func, wait = 50, immediate) {
  let timeout;
  return function () {
    // @ts-ignore
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


/** The List of Alphabet Letters. Pass in case as argument to get specific case Alphabet */
export const getAlphabet = (letter_case = 'both') => {
  if (letter_case === 'both') {
    return R.flatten('abcdefghijklmnopqrstuvwxyz'.split('').map(s => [s.toLowerCase(), s.toUpperCase()]));
  } else if (letter_case === 'lower') {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(s => s.toLowerCase());
  } else if (letter_case === 'upper') {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(s => s.toUpperCase());
  }
}


/** Convert HTML To String */
export const htmlToString = (html) => {
  return html.replace(/<[^>]+>/g, '');
  // const htmlElement = document.createElement("b");
  // htmlElement.innerHTML = html;
  // return htmlElement.innerText;
}