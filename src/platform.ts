export const getBrowserName = () => {
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Google Chrome";
  }
  // FIREFOX
  else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Mozilla Firefox";
  }
  // INTERNET EXPLORER
  else if (navigator.userAgent.indexOf("MSIE") != -1) {
    return "Internet Exploder";
  }
  // EDGE
  else if (navigator.userAgent.indexOf("Edge") != -1) {
    return "Edge";
  }
  // SAFARI
  else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  }
  // OPERA
  else if (navigator.userAgent.indexOf("Opera") != -1) {
    return "Opera";
  }
  // YANDEX BROWSER
  else if (navigator.userAgent.indexOf("YaBrowser") != -1) {
    return "YaBrowser";
  }
  // OTHERS
  else {
    return "Others";
  }
}

const CHROMIUM = "Chromium";
const GECKO = "Gecko";
const MSIE = "MSIE";

export const getBrowserEngine = () => {
  return {
    "Opera": CHROMIUM,
    "Edge": CHROMIUM,
    "Google Chrome": CHROMIUM,
    "YaBrowser": CHROMIUM,
    "Mozilla Firefox": GECKO,
    "Internet Exploder": MSIE,
  }[name] || CHROMIUM;
}



const name = getBrowserName();
const engine = getBrowserEngine();
const is_chromium = engine === CHROMIUM;

export const isChromium = () => {
  return is_chromium;
}