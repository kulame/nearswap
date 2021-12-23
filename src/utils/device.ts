export const isMobile = (): boolean => {
  return window.screen.width < 1024;
};

export const isPC = (): boolean => {
  return window.screen.width >= 1024;
};
