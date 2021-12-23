export const isMobile = (): boolean => {
  console.log(window.screen.width);
  return window.screen.width < 1024;
};

export const isPC = (): boolean => {
  return window.screen.width >= 1024;
};
