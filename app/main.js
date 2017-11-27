import path from 'path';
import url from 'url';
import axios from 'axios';
import {app, crashReporter, BrowserWindow, Menu, dialog} from 'electron';
import {gitRoot} from './gitutil';

const isDevelopment = (process.env.NODE_ENV === 'development');

let mainWindow = null;
let forceQuit = false;

const requestedPath = process.env.GIT_REPO || process.cwd();

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: true
  });

  // const root = await gitRoot(requestedPath);
  // console.log('Root git repo specified at command line:', root);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    query: {root},
    slashes: true
  }));

  // mainWindow.show()

  // show window once on first load
  // mainWindow.webContents.once('did-finish-load', () => {
  //   mainWindow.show();
  // });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(props.x, props.y);
        }
      }]).popup(mainWindow);
    });
  }
});



/**************************THIS IS ALL THE GITHUB AUTH*******************************/
// const OauthGithub = require('electron-oauth-github');

// const github = new OauthGithub({
//   id: '396886cb334c10fa05cc',
//   secret: '2ab56980ab768bb021baf2d361ebfa84c1768632',
//   scopes: ['user', 'repo']
// });

// github.startRequest((access_token, err) => {
//   if(err){
//     console.error(err);
//   }
//   dialog.showOpenDialog();
//   console.log('GIT ACCESS TOKEN:', access_token);
// });

// const options = {
//   client_id: '396886cb334c10fa05cc',
//   client_secret: '2ab56980ab768bb021baf2d361ebfa84c1768632',
//   scope: ['user', 'repo']
// };

// app.on('ready', () => {
//   const authWindow = new BrowserWindow({ width: 800, height: 800, show: true, 'node-integration': false });
//   let githubUrl = 'https://github.com/login/oauth/authorize?';
//   let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
//   authWindow.loadURL(authUrl);
//   authWindow.show();

//   function handleCallback(url) {
//     const raw_code = /code=([^&]*)/.exec(url) || null;
//     const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
//     const error = /\?error=(.+)$/.exec(url);

//     if (code || error) {
//       authWindow.destroy();
//     }
//     if (code) {
//       console.log('IM GETTING HERE');
//       axios.post('https://github.com/login/oauth/access_token', {
//         client_id: options.client_id,
//         client_secret: options.client_secret,
//         code: code
//       })
//         .then((err, response) => {
//           if (response) {
//             console.log('this sohuld be the token', response.body.access_token);
//           } else{
//             console.log('There has been an error', err);
//           }
//         });
//     } else if (error) {
//       alert('Oops! Something went wrong and we couldn\'t' +
//         'log you in using Github. Please try again.');
//     }
//   }

//   authWindow.webContents.on('will-navigate', (event, url) => {
//     handleCallback(url);
//   });

//   authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
//     handleCallback(newUrl);
//   });
// });
