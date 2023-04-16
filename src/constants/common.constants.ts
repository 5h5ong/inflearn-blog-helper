export const KEY = {
  ENTER: "Enter",
  TAB: "Tab",
} as const;
export type KEY = typeof KEY[keyof typeof KEY];
