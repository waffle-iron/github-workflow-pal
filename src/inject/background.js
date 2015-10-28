chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.url.match(/.*\/github.com\/buildo\/.*\pull\/.*/)) {
    chrome.tabs.sendMessage(tab.id, { onPRPage: true });
  }
});
