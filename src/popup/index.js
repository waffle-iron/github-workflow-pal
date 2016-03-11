import '../icons/icon16.png';
import '../icons/icon48.png';
import '../icons/icon128.png';
import '!file?name=popup/popup.css!less!./popup.less';

const getElements = () => ({
  form: document.getElementById('form'),
  gyazoToken: document.getElementById('gyazo_token')
});

const update = () => {
  const { gyazoToken } = getElements();

  chrome.storage.sync.get({ accessToken: '' }, (items) => {
    gyazoToken.value = items.accessToken;
  })
};

const save = (cb) => {
  const { gyazoToken } = getElements();
  chrome.storage.sync.set({
    accessToken: gyazoToken.value
  }, cb);
};

document.addEventListener('DOMContentLoaded', () => {
  update();

  getElements().form.onsubmit = (e) => {
    e.preventDefault();
    save(update);
  };
});
