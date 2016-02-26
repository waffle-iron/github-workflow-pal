import '../manifest.json';
import '!file?name=_locales/en/messages.json!../_locales/en/messages.json';
import '!file?name=plugin/styles/plugin.css!less!./styles/plugin.less';
import $ from 'jquery';

import gatekeepMergeButton from './gatekeepMergeButton';
import addNewBuildoIssueButton from './addNewBuildoIssueButton';
import addSubIssueButton from './addSubIssueButton';
import addMyMilestoneButton from './addMyMilestoneButton';

chrome.runtime.onMessage.addListener(function({
  onIssuesPage,
  onIssuePage,
  onPRPage
}) {

  const isGithubLoading = !!$('.is-context-loading').length;

  if (isGithubLoading) {
    return;
  }

  if (onPRPage) {
    gatekeepMergeButton();
  }

  if (onIssuesPage) {
    addNewBuildoIssueButton();
    addMyMilestoneButton();
  }

  if (onIssuePage) {
    addSubIssueButton();
  }

  return true;
});
