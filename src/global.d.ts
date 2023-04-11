declare namespace globalThis {
  /**
   * api.ts의 함수들의 타입들을 가져와 api에 적용함
   */
  // eslint-disable-next-line
  var api: typeof import("./api").default;
}
