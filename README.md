A UI that allows you to schedule classes for Sakai (Dokuz Eylül University online class platform). It will also login by your account to live classes.

![image](https://user-images.githubusercontent.com/72658150/164252244-6a418f7a-fffe-47fc-93b2-7270564518aa.png)

## Usage

DO NOT FORGET THAT YOU NEED AN ACTUAL SAKAI (Dokuz Eylül University) ACCOUNT IN ORDER TO USE THE APP.

You can just install the packages and run the app and the server will start itself.

```sh
npm install
npm start
```

## Tech Stack
- [Electron.js] - Electron.js was the main layer which connects Frontend and automations since we can use any Node.js packages inside the main process.
- [React.js] - React.js was used as the main Frontend framework.
- [TailwindCSS] - I could say it just makes the development way faster.
- [Selenium] - I prefered Selenium WebDriver to manipulate browser (mainly to get/join classes).

## License

MIT
