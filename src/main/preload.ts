import { remote } from 'electron';
import { isDevelopment } from 'common/utils';

window.addEventListener('DOMContentLoaded', () => {
  document.title += ` ${isDevelopment ? process.env.NODE_ENV : `v${remote.app.getVersion()}`}`;
});
