// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import api from "./api";
import ipcConstants from "./constants/ipc.constants";

contextBridge.exposeInMainWorld("api", api);

window.addEventListener("DOMContentLoaded", () => {
  const writeBlogButton = document.getElementById(
    "write-blog-button"
  ) as HTMLButtonElement;

  // 글 작성 페이지에 있다면 버튼을 활성화, 그렇지 않다면 비활성화
  ipcRenderer.on(ipcConstants.ON_URL_CHANGED, (_event, currentUrl) => {
    console.log({ currentUrl });
    if (currentUrl === "https://www.inflearn.com/blog/new") {
      writeBlogButton.disabled = false;
      return;
    }
    writeBlogButton.disabled = true;
    return;
  });
});
