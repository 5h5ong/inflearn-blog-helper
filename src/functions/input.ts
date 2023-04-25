import { BrowserView } from "electron";
import { Keys, MouseButton } from "../types/common.interface";
import { combineArrayWithSeparator } from "./string";
import { curry } from "lodash";

export const sendTextToBrowserView = curry(
  (view: BrowserView, text: string) => {
    view.webContents.sendInputEvent({
      type: "char",
      keyCode: text,
    });
  }
);

export const sendKeyToBrowserView = curry(
  (view: BrowserView, keys: Keys["keys"]) => {
    const combinedString = combineArrayWithSeparator(keys, "+");
    view.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: combinedString,
    });
    view.webContents.sendInputEvent({
      type: "keyUp",
      keyCode: combinedString,
    });
  }
);

export const sendMouseClickToBrowserView = (
  view: BrowserView,
  button: MouseButton,
  x: number,
  y: number
) => {
  view.webContents.sendInputEvent({
    type: "mouseDown",
    button: button,
    x: x,
    y: y,
  });
  view.webContents.sendInputEvent({
    type: "mouseUp",
    button: button,
    x: x,
    y: y,
  });
};
