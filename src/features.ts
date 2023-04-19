import { ipcRenderer } from "electron";
import ipcConstants from "./constants/ipc.constants";

export const editUsername = (username: string) => {
  ipcRenderer.send(ipcConstants.EDIT_USERNAME, { username });
};

export const getUsername = async (): Promise<string> => {
  return ipcRenderer.invoke(ipcConstants.GET_USERNAME);
};

export const checkCurrentUrl = async (): Promise<boolean> => {
  return ipcRenderer.invoke(ipcConstants.CHECK_CURRENT_URL);
};

export const parseMarkdownFile = async (): Promise<boolean> => {
  return ipcRenderer.invoke(ipcConstants.PARSE_MARKDOWN_FILE);
};

export const getMarkdownStatus = async (): Promise<boolean> => {
  return ipcRenderer.invoke(ipcConstants.GET_MARKDOWN_STATUS);
};
