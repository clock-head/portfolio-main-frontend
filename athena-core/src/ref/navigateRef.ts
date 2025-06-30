export type NavigateRefType = {
  goTo: (path: string) => void;
};

export const navigateRef = {
  goTo: (path: string) => {
    console.warn('[NavigateRef] goTo is uninitialized.');
  },
};
