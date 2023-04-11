import Store from "electron-store";
import { StoreType } from "./store.interface";

export const getUsername = async (store: Store<StoreType>) => {
  return store.get("userName");
};

export const setUsername = async (
  store: Store<StoreType>,
  username: string
) => {
  store.set("userName", username);
};

export const loadUrl = async (
  webContents: Electron.WebContents,
  url: string
) => {
  console.log(`[loadUrl fn]`, { url });
  await webContents.loadURL(url);
};

/**
 * 유저네임에 맞는 인프런 소개 페이지를 로드함
 */
export const loadInflearnUrl = async (
  webContents: Electron.WebContents,
  username: string
) => {
  return loadUrl(webContents, `https://www.inflearn.com/users/${username}`);
};

export const setUsernameAndgoToPage = (
  store: Store<StoreType>,
  webContents: Electron.WebContents,
  username: string
) => {
  setUsername(store, username);
  loadInflearnUrl(webContents, username);
  // webContents.loadURL("https://google.com");
};

/**
 * 지연 시간 동안 변화가 없다면 함수를 실행함
 * @param fn 실행될 함수
 * @param delay 지연 시간
 * @returns 디바운스 함수
 */
export const debounce = <A extends unknown[], R = void>(
  fn: (...args: A) => R,
  delay = 500
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: A) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      console.log("debounced!");
      fn(...args);
    }, delay);
  };
};
