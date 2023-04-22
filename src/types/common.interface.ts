export const KeyAccelerator = {
  ENTER: "Enter",
  SHIFT: "Shift",
} as const;
export type KeyAccelerator = typeof KeyAccelerator[keyof typeof KeyAccelerator];

export interface Keys {
  keys: KeyAccelerator[];
}

export type MouseButton = "left" | "right";

export interface MarkdownContent {
  index: number;
  array: (string | Keys)[];
}

export interface MarkdownV2 {
  text?: MarkdownContent[];
  codeblock?: MarkdownContent[];
  list?: MarkdownContent[];
}
