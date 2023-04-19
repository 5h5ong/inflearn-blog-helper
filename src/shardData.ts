import { MarkdownV2 } from "./types/common.interface";

let markdownObject: MarkdownV2;
let isMarkdownLoaded: boolean;

export const setMarkdownObject = (newMarkdownObject: MarkdownV2) => {
  markdownObject = newMarkdownObject;
};

export const getMarkdownObject = () => {
  return markdownObject;
};

export const setIsMarkdownLoaded = (value: boolean) => {
  isMarkdownLoaded = value;
};

export const getIsMarkdownLoaded = () => {
  return isMarkdownLoaded;
};
