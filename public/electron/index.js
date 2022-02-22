const path = require('path');
const electron = require('electron');
const webdriver = require('selenium-webdriver');
const {
    LOGIN_EVENT,
    ALL_LESSONS_REPLY,
    ALL_LESSONS_STATUS,
    SCHEDULE: { ADD_LESSON, REMOVE_LESSON },
    IS_AUTHORIZED,
} = require('../../src/Constants');
const utils = require('./utility');
const { ipcMain, app, BrowserWindow, shell } = electron;
const { By } = webdriver;
const schedule = require('node-schedule');

const SAKAI_URL = 'https://online.deu.edu.tr/portal';
let driver;
let mainWindow;

// Initiate main process
function createWindow() {
    mainWindow = new BrowserWindow({
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

ipcMain.on(LOGIN_EVENT, async (event, user) => {
    loginToSakai(user);

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
        event.reply(IS_AUTHORIZED, true);
        event.reply(ALL_LESSONS_REPLY, utils.filterLessons(lessonNames));
    }, 6000);
});

ipcMain.on(ADD_LESSON, async (event, args) => {
    const { name, hour, day } = args;
    const jobName = hour.toString() + day.toString();

    let rule;
    if (day == 5) {
        rule = { hour: 23, minute: 46, dayOfWeek: 2 };
    } else {
        rule = { hour, minute: 0, dayOfWeek: day };
    }
    const onTrigger = () => joinToLesson(name);

    const j = schedule.scheduleJob(jobName, rule, onTrigger);
});

ipcMain.on(REMOVE_LESSON, async (event, args) => {
    const { hour, day } = args;

    schedule.scheduledJobs[hour + day].cancel();
});

const joinToLesson = async (lessonName) => {
    const user = await getFromLocalStorage('user');
    loginToSakai(user);

    const lessonRef = driver.findElement(webdriver.By.css(`a[title="${lessonName}"]`));
    const lessonUrl = lessonRef.getAttribute('href');

    driver.get(lessonUrl);
};

const loginToSakai = (user) => {
    const { username, password } = user;
    if (!driver) initiateChromeDriverClient();

    // Open sakai website
    driver.get(SAKAI_URL);

    // Login
    driver.findElement(webdriver.By.id('eid')).sendKeys(username);
    driver.findElement(webdriver.By.id('pw')).sendKeys(password);
    driver.findElement(webdriver.By.id('submit')).click();
};

const initiateChromeDriverServer = async () => {
    // Run the ChromeDriver server
    const executablePath = app.getAppPath() + '/node_modules/.bin/chromedriver.exe';
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

const getFromLocalStorage = async (key) => {
    const val = await mainWindow.webContents.executeJavaScript(`localStorage.getItem('${key}')`);
    return val;
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
