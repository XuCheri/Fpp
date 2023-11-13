const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { updateElectronApp } = require("update-electron-app");
updateElectronApp();
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      // 书写渲染进程中的配置
      nodeIntegration: true, //开启true这一步很重要,目的是为了vue文件中可以引入node和electron相关的API
      contextIsolation: true, // 可以使用require方法
      enableRemoteModule: true, // 可以使用remote方法
      devTools: true, // 开启调试工具
    },
  });
  win.loadFile(path.resolve(__dirname, "./dist/index.html"));
  win.loadUrl(`${process.env["VITE_DEV_SERVER_URL"]}`);
  // win.loadURL("http://localhost:8888");
  // 打开开发工具
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  // ipcMain.handle("ping", () => "pong");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
