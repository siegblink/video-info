const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron
// let mainWindow

// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     webPreferences: { nodeIntegration: true },
//   })
//   mainWindow.loadURL(`file://${__dirname}/index.html`)
// })

// ipcMain.on('video:submit', (event, path) => {
//   ffmpeg.ffprobe(path, (err, metadata) => {
//     mainWindow.webContents.send('video:metadata', metadata.format.duration)
//   })
// })

let window

function createWindow() {
  // Create browser window
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  window.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    window.webContents.send('video:metadata', metadata.format.duration)
  })
})
