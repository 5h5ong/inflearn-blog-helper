// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import api from "./api";
import ipcConstants from "./constants/ipc.constants";

contextBridge.exposeInMainWorld("api", api);

const shouldEnableWriteButton = async (url: string) => {
  const markdownStatus = await api.getMarkdownStatus();
  return url === "https://www.inflearn.com/blog/new" && markdownStatus;
};

window.addEventListener("DOMContentLoaded", () => {
  const writeBlogButton = document.getElementById(
    "write-blog-button"
  ) as HTMLButtonElement;
  const markdownStatusSpanEle = document.getElementById("markdown-status");

  ipcRenderer.on(ipcConstants.ON_MARKDOWN_LOADED, async () => {
    const markdownStatus = await api.getMarkdownStatus();
    if (markdownStatus) {
      markdownStatusSpanEle.innerText = "마크다운 로드 완료";
    }
  });

  // 글 작성 페이지에 있다면 버튼을 활성화, 그렇지 않다면 비활성화
  ipcRenderer.on(
    ipcConstants.ON_WRITE_STATE_CHANGED,
    async (_event, currentUrl) => {
      if (await shouldEnableWriteButton(currentUrl)) {
        writeBlogButton.disabled = false;
        return;
      }
      writeBlogButton.disabled = true;
      return;
    }
  );
});
