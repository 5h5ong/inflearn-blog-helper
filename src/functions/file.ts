import { readFile } from "fs";

/**
 * 마크다운 텍스트를 읽고 텍스트 리턴
 */
export const readFileText = async (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
