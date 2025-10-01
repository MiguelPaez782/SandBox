const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
  hello: () => "Hola desde preload!"
});
