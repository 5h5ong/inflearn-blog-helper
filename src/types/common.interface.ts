interface MarkdownContent<T> {
  index: number;
  array: T[];
}

export interface MarkdownV2 {
  text?: MarkdownContent<string>[];
  codeblock?: MarkdownContent<string>[];
  list?: MarkdownContent<string>[];
}
