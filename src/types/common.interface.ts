const KeyAccelerator = {
  ENTER: "Enter",
  SHIFT: "Shift",
} as const;
type KeyAccelerator = typeof KeyAccelerator[keyof typeof KeyAccelerator];

interface Key {
  keys: KeyAccelerator[];
}

interface MarkdownContent<T> {
  index: number;
  array: T[];
}

export interface MarkdownV2 {
  text?: MarkdownContent<string | Key>[];
  codeblock?: MarkdownContent<string | Key>[];
  list?: MarkdownContent<string | Key>[];
}
