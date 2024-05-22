const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const gemini = require('gemini-api'); // Assuming gemini-api is installed

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('src/renderer/index.html');

  // Replace with your actual API credentials
  const apiKey = 'AIzaSyBPv9UpztZ-Ge7F6K0A7rgKw3yXWKeBfgI';
  const secretKey = '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';

  // Create a Gemini API client
  const client = new gemini.ApiClient({ apiKey, secretKey });

  // Handle communication from the renderer process
  mainWindow.webContents.on('ipc-message', (event, args) => {
    if (args.command === 'get-data') {
      const symbol = args.data; // Assuming symbol is received from renderer

      client.publicData.getTicker(symbol)
        .then((response) => {
          const data = response.data;
          event.sender.send('data-response', data);
        })
        .catch((error) => {
          console.error('Error:', error);
          event.sender.send('data-response', { error: 'Error retrieving data' });
        });
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
});
