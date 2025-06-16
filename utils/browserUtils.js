export const isBrowser = () => typeof window !== "undefined";

export const safeWindow = () => (isBrowser() ? window : {});

// Helper to safely access window properties
export const getWindowProperty = (property) => {
  if (isBrowser()) {
    return window[property];
  }
  return undefined;
};
