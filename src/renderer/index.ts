import {isDevelopment} from '../common/utils';

if (isDevelopment && module.hot) {
    module.hot.accept();
}

const app = document.querySelector('#app');
if (app) {
    app.innerHTML = `<h1>Hello World!</h1>
We are using Node.js ${process.versions.node},
Chromium ${process.versions.chrome},
and Electron ${process.versions.electron}.`;
}
