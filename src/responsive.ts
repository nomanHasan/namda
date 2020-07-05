/** Checks if the agent is a mobile device. Checks by the screen innerWidth */
export const isMobile = () => {
  if(window.innerWidth <= 800) {
    return true;
  } else {
    return false;
  }
};
