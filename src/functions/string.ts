/**
 * 텍스트를 \n으로 나눔
 */
export const splitMarkdownTextIntoNewlines = (text: string): string[] => {
  const result = text.split("\n");
  return result;
};
