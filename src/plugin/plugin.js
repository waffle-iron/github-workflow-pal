import '../manifest.json';
import '!file?name=_locales/en/messages.json!../_locales/en/messages.json';
import '!file?name=plugin/styles/plugin.css!less!./styles/plugin.less';
import $ from 'jquery';

import gatekeepMergeButton from './gatekeepMergeButton';
import addNewBuildoIssueButton from './addNewBuildoIssueButton';
import addSubIssueButton from './addSubIssueButton';

chrome.runtime.onMessage.addListener(function({
  onIssuesPage,
  onIssuePage,
  onPRPage,
  oldInterface
}) {

  const isGithubLoading = !!$('.is-context-loading').length;

  if (isGithubLoading) {
    return;
  }

  if (onPRPage) {
    gatekeepMergeButton();
  }

  if (onIssuesPage) {
    addNewBuildoIssueButton({ oldInterface });
  }

  if (onIssuePage) {
    addSubIssueButton();
  }

  return true;
});
