const { app, BrowserWindow, ipcMain } = require('electron');
const dotenv = require('dotenv');
const { execSync } = require('node:child_process');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const os = require('node:os'); 
const path = require('node:path');

dotenv.config()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('src/renderer/index.html');
};

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const makeRequestToAPI = async (event, prompt) => {
  if (process.env.MAKE_DISABLE_API != null) { return prompt.replace(/```+/g, "").trim() }

  const prefix = "For the following prompt, generate ONLY the PowerShell code that is requested in a SINGLE file: "
  const result = await model.generateContent(prefix + prompt)
  const response = result.response
  
  return response.text().replace(/```+/g, "").replace(/powershell+/g, "").trim()
}

const executeCode = async (event, code) => {
  let command = ""
  let options = {}

  if (os.platform() == "win32") {
    command = "powershell -Command " + "'" + code + "'"
    options = {shell: "powershell.exe"}
  }
  else if (os.platform() == "linux") { command = "pwsh -Command " + "'" + code + "'" }
  else if (os.platform() == "darwin") { command = "pwsh -Command " + "'" + code + "'" }

  let response = {}
  
  try {
    response.output = execSync(command, options).toLocaleString()
    response.isSuccessful = true
  }
  catch (error) {
    response.output = error.message
    response.isSuccessful = false
  }

  return response
}

const remakeRequestToAPI = async (event, code, output) => {
  if (process.env.REMAKE_DISABLE_API != null) { return prompt.replace(/```+/g, "").trim() }

  const prompt = code + " This PowerShell code gave me the following error: " + output + " Generate ONLY the PowerShell code that fixes the problem in a SINGLE file."
  const result = await model.generateContent(prompt)
  const response = result.response
  
  return response.text().replace(/```+/g, "").replace(/powershell+/g, "").trim()
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('api-request', makeRequestToAPI)
  ipcMain.handle('code-execution', executeCode)
  ipcMain.handle('remake-request', remakeRequestToAPI)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});
