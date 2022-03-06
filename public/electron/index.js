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
const { ipcMain, app, BrowserWindow, shell, Tray, nativeImage, Menu } = electron;
const { By } = webdriver;
const schedule = require('node-schedule');
const AutoLaunch = require('auto-launch');

const SAKAI_URL = 'https://online.deu.edu.tr/portal';
let driver;
let mainWindow;
let tray = null;

function createTray() {
    const icon = path.join(__dirname, '../logo.png');
    const trayicon = nativeImage.createFromPath(icon);
    tray = new Tray(trayicon.resize({ width: 16 }));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                if (!mainWindow) createWindow();
            },
        },
        {
            label: 'Quit',
            click: () => {
                app.quit(); // Quit the app.
                if (driver) driver.quit(); // Quit the WebDriver
            },
        },
    ]);
    tray.setToolTip(app.name);
    tray.setContextMenu(contextMenu);
}

// Initiate main process
function createWindow() {
    if (!tray) createTray();

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

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

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
    const { name, hour, day, jobName } = args;

    let rule;
    if (day == 5) {
        rule = { hour: 16, minute: 21, dayOfWeek: 0 };
    } else {
        rule = { hour, dayOfWeek: day };
    }
    // rule = { hour, dayOfWeek: day };
    const onTrigger = () => joinToLesson(name);

    const j = schedule.scheduleJob(jobName, rule, onTrigger);
});

ipcMain.on(REMOVE_LESSON, async (event, { jobName }) => {
    schedule.scheduledJobs[jobName].cancel();
});

const joinToLesson = async (lessonName) => {
    const user = await getFromLocalStorage('user');
    loginToSakai(user);

    const lessonRef = await driver.findElement(webdriver.By.css(`a[title="${lessonName}"]`));
    const lessonUrl = await lessonRef.getAttribute('href');

    await driver.get(lessonUrl);

    const liveLessonBtn = await driver.wait(
        webdriver.until.elementLocated(
            By.css(
                `a[title="Canlı Ders - Sakai Interface onto the BigBlueButton conferencing tool"]`,
            ),
        ),
    );

    await liveLessonBtn.click();

    // Try to join
    try {
        const rows = await driver.findElements(webdriver.By.className('meetingRow'));
        for (const row of rows) {
            const cells = await row.findElements(webdriver.By.css('td'));
            const statusText = await cells[1].getText();

            if (statusText === '') {
                // Status cell is empty when that class is active on SAKAI
                const lessonLink = await row.findElement(webdriver.By.css('a'));
                lessonLink.click();

                setTimeout(async () => {
                    const meetingLink = await driver.findElement(
                        webdriver.By.id('joinMeetingLink'),
                    );
                    meetingLink.click();
                }, 2000);
                break;
            }
        }
    } catch (e) {
        console.log('Error when trying to join lesson.');
        console.warn(e);
    }
};

const loginToSakai = async (user) => {
    const { username, password } = user;
    if (!driver) initiateChromeDriverClient();

    // Open sakai website
    await driver.get(SAKAI_URL);

    // Login
    try {
        const usernameRef = await driver.wait(webdriver.until.elementLocated(By.id('eid')));
        const passwordRef = await driver.wait(webdriver.until.elementLocated(By.id('pw')));
        const submitRef = await driver.wait(webdriver.until.elementLocated(By.id('submit')));

        await usernameRef.sendKeys(username);
        await passwordRef.sendKeys(password);
        await submitRef.click();
    } catch (e) {
        console.log('Already logged in!');
    }
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

app.on('ready', () => {
    initiateChromeDriverServer();
    createWindow();

    let autoLaunch = new AutoLaunch({
        name: app.name,
        path: app.getPath('exe'),
    });
    autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled) autoLaunch.enable();
    });
});

app.on('window-all-closed', () => {});
