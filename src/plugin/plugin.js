import '../manifest.json';
import '!file?name=_locales/en/messages.json!../_locales/en/messages.json';
import '!file?name=plugin/styles/plugin.css!less!./styles/plugin.less';

import gatekeepMergeButton from './gatekeepMergeButton';
import addNewBugButton from './addNewBugButton';

chrome.runtime.onMessage.addListener(function(message) {

  if (message.onPRPage) {
    gatekeepMergeButton();
  }

  if (message.onIssuesPage) {
    addNewBugButton();
  }

  return true;
});
