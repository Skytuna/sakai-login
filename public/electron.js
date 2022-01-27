const path = require('path');
const { ipcMain, app, BrowserWindow } = require('electron');
const webdriver = require('selenium-webdriver');
const { LOGIN_EVENT, ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } = require('../src/Constants');
const { By } = webdriver;

const SAKAI_URL = 'https://online.deu.edu.tr/portal';

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

ipcMain.on(LOGIN_EVENT, (event, args) => {
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

    // Login
    const { username, password } = args;
    driver.findElement(webdriver.By.id('eid')).sendKeys(username);
    driver.findElement(webdriver.By.id('pw')).sendKeys(password);
    driver.findElement(webdriver.By.id('submit')).click();

    event.reply(ALL_LESSONS_STATUS, true);
    const lessonNames = [];
    // Get lesson names of the user
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

// TODO

// Selenium serverını otomatik açtırt
// Dersler alınıp react stateine gönderilecek
// React stateinden dropdown yapılacak
// Seçili ders için saat ve gün ataması yapılacak
