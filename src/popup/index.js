// require('./index.html');
require('../icons/icon16.png');
require('../icons/icon48.png');
require('../icons/icon128.png');

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
