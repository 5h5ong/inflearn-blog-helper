import { MarkdownContent, MarkdownV2 } from "../types/common.interface";
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

/**
 * 마크다운의 중요한 요소(코드블럭, 리스트 등)을 재귀적으로 파싱
 * @param markdownArray 마크다운 어레이
 * @param markdownObject 생성 중인 마크다운 오브젝트
 * @param index 마크다운 요소들의 순서
 * @returns 완성된 마크다운 오브젝트
 */
const recurMakeMarkdownObject = (
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
    return recurMakeMarkdownObject(
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

  return recurMakeMarkdownObject(
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

/**
 * 마크다운의 중요한 요소(코드블럭, 리스트...)들로 나눈 오브젝트로 변환해 리턴함
 * @param markdownArray 마크다운 어레이
 * @returns 마크다운 오브젝트
 */
export const makeMarkdownObject = (markdownArray: string[]) =>
  recurMakeMarkdownObject(markdownArray);

export const extractValuesFromMarkdownObject = (obj: MarkdownV2) => {
  const objEntries = Object.entries(obj);
  return objEntries.reduce<MarkdownContent[]>((prev, [_, values]) => {
    return [...prev, ...values];
  }, []);
};
