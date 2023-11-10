"use strict";
const { app: e, BrowserWindow: t, ipcMain: r } = require("electron"), i = require("node:path"), { updateElectronApp: l } = require("update-electron-app");
l();
const o = () => {
  const n = new t({ width: 800, height: 600, webPreferences: { nodeIntegration: true, contextIsolation: false, enableRemoteModule: true, devTools: true } });
  n.loadFile(i.resolve(__dirname, "./dist/index.html")), n.loadUrl(`${process.env.VITE_DEV_SERVER_URL}`), n.webContents.openDevTools();
};
e.whenReady().then(() => {
  r.handle("ping", () => "pong"), o(), e.on("activate", () => {
    t.getAllWindows().length === 0 && o();
  });
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
