const { app, BrowserWindow, ipcMain } = require('electron');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('node:path');

dotenv.config()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('src/renderer/index.html');
};

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const makeRequestToAPI = async (event, prompt) => {
  if (process.env.DISABLE_API != null) { return "```Get-Process```" }

  const prefix = "For the following prompt, generate ONLY the code that is requested in a SINGLE file: "
  const result = await model.generateContent(prefix + prompt)
  const response = result.response;
  
  return response.text();
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('api-request', makeRequestToAPI)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});
