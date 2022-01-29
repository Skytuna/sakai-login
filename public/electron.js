const path = require('path');
const electron = require('electron');
const webdriver = require('selenium-webdriver');
const { LOGIN_EVENT, ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } = require('../src/Constants');
const { ipcMain, app, BrowserWindow, shell } = electron;
const { By } = webdriver;

const SAKAI_URL = 'https://online.deu.edu.tr/portal';
let driver;

// Initiate main process
function createWindow() {
    const screen = electron.screen.getPrimaryDisplay().size;

    const mainWindow = new BrowserWindow({
        width: screen.width,
        height: screen.height,
        fullscreen: true,
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

app.whenReady().then(() => {
    // Create the main window
    createWindow();

    initiateChromeDriverServer();
});

ipcMain.on(LOGIN_EVENT, async (event, args) => {
    initiateChromeDriverClient();

    // Open sakai website
    driver.get(SAKAI_URL);

    // Login
    const { username, password } = args;
    driver.findElement(webdriver.By.id('eid')).sendKeys(username);
    driver.findElement(webdriver.By.id('pw')).sendKeys(password);
    driver.findElement(webdriver.By.id('submit')).click();

    // Get lesson names of the user
    event.reply(ALL_LESSONS_STATUS, true);
    const lessonNames = [];
    setTimeout(async () => {
        const lessonNameRefList = await driver.findElements(By.className('link-container'));

        lessonNameRefList.forEach(async (ref) => {
            const lessonName = await ref.getAttribute('title');
            lessonNames.push(lessonName);
        });
    }, 4000);

    // Send them to react app
    setTimeout(() => {
        event.reply(ALL_LESSONS_STATUS, false);
        event.reply(ALL_LESSONS_REPLY, lessonNames);
    }, 6000);
});

const initiateChromeDriverServer = async () => {
    // Run the ChromeDriver server
    const executablePath = app.getAppPath() + '/node_modules/.bin/chromedriver';
    await shell.openPath(executablePath);
};

const initiateChromeDriverClient = () => {
    // Inititate the WebDriver server
    driver = new webdriver.Builder()
        .usingServer('http://localhost:9515')
        .withCapabilities({
            'goog:chromeOptions': {
                binary: process.env.PORTABLE_EXECUTABLE_DIR,
            },
        })
        .forBrowser('chrome')
        .build();
};

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
