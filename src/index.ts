import { app, BrowserView, BrowserWindow, ipcMain, Menu } from "electron";
import Store from "electron-store";
import ipcConstants from "./constants/ipc.constants";
import { StoreType } from "./store.interface";
import {
  setUsername,
  getUsername,
  loadUrl,
  loadInflearnUrl,
  debounce,
  setUsernameAndgoToPage,
} from "./utils";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// 스토어 설정
const store = new Store<StoreType>({
  defaults: {
    userName: "",
  },
});

const createWindow = async (
  electronStore: Store<StoreType>
): Promise<{ window: BrowserWindow; view: BrowserView }> => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 1080,
    width: 1000,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  // Create the browser view
  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 1000, height: 720 });

  // 유저네임이 없다면 아무 것도 띄우지 않음
  const username = await getUsername(electronStore);
  // BrowserView에 소개 페이지 띄우기
  const url = username ? `https://www.inflearn.com/users/${username}` : ``;
  // await로 기다리면 `did-finish-load` 이벤트가 발생하지 않음
  loadUrl(view.webContents, url);
  // loadUrl(view.webContents, `https://www.inflearn.com/users/@call5h5ong`);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // view.webContents.openDevTools({ mode: "bottom" });

  // 오른쪽 클릭으로 좌표 확인
  view.webContents.on("context-menu", (event, params) => {
    const { x, y } = params;
    console.log({ x, y });
  });

  view.webContents.on("did-finish-load", async () => {
    console.log("view is finish to load!");

    // view의 현재 페이지 url을 가져옴
    const currentUrl = view.webContents.getURL();

    // 렌더러 프로세스로 현재 페이지의 url을 보냄
    mainWindow.webContents.send(ipcConstants.ON_URL_CHANGED, currentUrl);
  });

  return { window: mainWindow, view: view };
};

app.on("ready", async () => {
  const { window, view } = await createWindow(store);

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        { role: "quit" },
        {
          label: `Go to new page`,
          accelerator: `Ctrl+Cmd+A`,
          click: () => {
            console.log("새로운 페이지로 이동합니다.");
            view.webContents.loadURL(`https://google.com/`);
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  view.webContents.on("dom-ready", async () => {
    const currentUrl = view.webContents.getURL();

    // 글 작성 페이지에서 다른 페이지로 이동할 때 뜨는 dialog를 비활성화 함
    if (currentUrl === "https://www.inflearn.com/blog/new") {
      await view.webContents.executeJavaScript(
        `if(window.onbeforeunload) { window.onbeforeunload = null; };0`
      );
    }
  });

  // IPC
  const debouncedSetUsernameAndGoToPage = debounce(setUsernameAndgoToPage);
  ipcMain.on(ipcConstants.EDIT_USERNAME, (e, payload: { username: string }) => {
    debouncedSetUsernameAndGoToPage(store, view.webContents, payload.username);
  });

  ipcMain.on(ipcConstants.EDIT_USERNAME, (e, payload: { username: string }) => {
    setUsername(store, payload.username);
  });

  ipcMain.handle(ipcConstants.GET_USERNAME, () => {
    const username = getUsername(store);
    return username;
  });

  // 현재 url을 비교함
  ipcMain.handle(
    ipcConstants.CHECK_CURRENT_URL,
    (e, payload: { urlToCompare: string }): boolean => {
      const { urlToCompare } = payload;
      const currentUrl = view.webContents.getURL();
      if (currentUrl === urlToCompare) {
        return true;
      }
      return false;
    }
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(store);
  }
});
