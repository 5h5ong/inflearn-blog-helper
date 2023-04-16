import { MarkdownV2 } from "../types/common.interface";
import { curry } from "lodash/fp";

export const checkWithRegex = curry((regex: RegExp, value: string) => {
  return regex.test(value);
});
const isEnter = (value: string) => value === "";
const isCodeblock = checkWithRegex(/```/);
const isOrderedList = checkWithRegex(/\d+\.\s.*/);
const isUnorderedList = checkWithRegex(
  /^(\s*(?:-|\+|\*) .+)(?:(?!\s*-|\s*\+|\s*\*))$/
);
const isSpecial = (value: string) =>
  isCodeblock(value) || isOrderedList(value) || isUnorderedList(value);

export const makeRawMarkdownObject = (
  markdownArray: string[],
  markdownObject: MarkdownV2 = { text: [], codeblock: [], list: [] },
  index = 0
): MarkdownV2 => {
  if (markdownArray.length < 1) {
    return markdownObject;
  }

  const notableIndex = markdownArray.findIndex(isSpecial);

  if (notableIndex < 0) {
    return {
      ...markdownObject,
      text: [...markdownObject.text, { index: index, array: markdownArray }],
    };
  }

  // 코드블럭쌍을 자름
  if (isCodeblock(markdownArray[0])) {
    const pairCodeblockIndex =
      markdownArray.slice(1).findIndex(isCodeblock) + 1;
    return makeRawMarkdownObject(
      markdownArray.slice(pairCodeblockIndex + 1),
      {
        ...markdownObject,
        codeblock: [
          ...markdownObject.codeblock,
          {
            index: index,
            array: markdownArray.slice(0, pairCodeblockIndex + 1),
          },
        ],
      },
      index + 1
    );
  }

  return makeRawMarkdownObject(
    markdownArray.slice(notableIndex),
    {
      ...markdownObject,
      text: [
        ...markdownObject.text,
        { index: index, array: markdownArray.slice(0, notableIndex) },
      ],
    },
    index + 1
  );
};
