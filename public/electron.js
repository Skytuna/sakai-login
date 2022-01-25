const path = require('path');
const { ipcMain, app, BrowserWindow } = require('electron');
const webdriver = require('selenium-webdriver');

// Constants
const SAKAI_URL = 'https://online.deu.edu.tr/portal';

// Initiate selenium
const driver = new webdriver.Builder()
    .usingServer('http://localhost:9515')
    .withCapabilities({
        'goog:chromeOptions': {
            binary: process.env.PORTABLE_EXECUTABLE_DIR,
        },
    })
    .forBrowser('chrome')
    .build();

driver.get(SAKAI_URL);

// Initiate main process
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    } else {
        mainWindow.loadURL('http://localhost:3000');
    }
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('login-event', async (_, args) => {
    const { username, password } = args;

    const usernameRef = await driver.findElement(webdriver.By.id('eid'));
    const passwordRef = await driver.findElement(webdriver.By.id('pw'));
    const submitBtnRef = await driver.findElement(webdriver.By.id('submit'));

    driver.executeScript("arguments[0].setAttribute('value', '" + username + "')", usernameRef);
    driver.executeScript("arguments[0].setAttribute('value', '" + password + "')", passwordRef);
    driver.executeScript('arguments[0].click()', submitBtnRef);
});
