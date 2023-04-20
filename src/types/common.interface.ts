export const KeyAccelerator = {
  ENTER: "Enter",
  SHIFT: "Shift",
} as const;
export type KeyAccelerator = typeof KeyAccelerator[keyof typeof KeyAccelerator];

interface Key {
  keys: KeyAccelerator[];
}

export interface MarkdownContent {
  index: number;
  array: (string | Key)[];
}

export interface MarkdownV2 {
  text?: MarkdownContent[];
  codeblock?: MarkdownContent[];
  list?: MarkdownContent[];
}
