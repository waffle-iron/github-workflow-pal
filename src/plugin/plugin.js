import '../manifest.json';
import '!file?name=_locales/en/messages.json!../_locales/en/messages.json';
import '!file?name=plugin/styles/plugin.css!less!./styles/plugin.less';
import $ from 'jquery';

import gatekeepMergeButton from './gatekeepMergeButton';
import addNewBuildoIssueButton from './addNewBuildoIssueButton';

chrome.runtime.onMessage.addListener(function(message) {

  const isGithubLoading = !!$('.is-context-loading').length;

  if (message.onPRPage && !isGithubLoading) {
    gatekeepMergeButton();
  }

  if (message.onIssuesPage && !isGithubLoading) {
    addNewBuildoIssueButton({ oldInterface: message.oldInterface });
  }

  return true;
});
