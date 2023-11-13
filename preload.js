// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   // 除函数之外，我们也可以暴露变量
//   ping: () => ipcRenderer.invoke("ping"),
// });
// const Store = require("electron-store");

// const store = new Store();
// store.set("events", []);
// contextBridge.exposeInMainWorld("store", {
//   get(key) {
//     return store.get(key);
//   },
//   set(key, val) {
//     return store.set(key, val);
//   },
// });
// 定义ipcRenderer监听事件
// preload.js
// import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
// const electronHandler = {
//   ipcRenderer: {
//     setStoreValue: (key, value) => {
//       ipcRenderer.send("setStore", key, value);
//     },

//     getStoreValue(key) {
//       const resp = ipcRenderer.sendSync("getStore", key);
//       return resp;
//     },
//   },
// };

// contextBridge.exposeInMainWorld("electron", electronHandler);
