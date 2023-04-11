import * as features from "./features";

// `exposeInMainWorld` 메서드를 위해 `features.ts`의 함수들을 묶어 내보냄
export default {
  ...features,
};
