import '../manifest.json';
import '!file?name=_locales/en/messages.json!../_locales/en/messages.json';
import '!file?name=plugin/styles/plugin.css!less!./styles/plugin.less';
import $ from 'jquery';

import gatekeepMergeButton from './gatekeepMergeButton';
import addNewBuildoIssueButton from './addNewBuildoIssueButton';
import addSubIssueButton from './addSubIssueButton';
import addMyMilestoneButton from './addMyMilestoneButton';
import autoSelectionBetweenBrackets from './autoSelectionBetweenBrackets';
import addGyazoButton from './addGyazoButton';
import addElephantReminderButton from './addElephantReminderButton';

chrome.runtime.onMessage.addListener(({
  onIssuesPage,
  onIssuePage,
  onPRPage,
  onNewIssuePage
}) => {

  const isGithubLoading = !!$('.is-context-loading').length;

  if (isGithubLoading) {
    return;
  }

  if (onPRPage) {
    addGyazoButton();
    gatekeepMergeButton();
    addElephantReminderButton();
  }

  if (onIssuesPage) {
    addNewBuildoIssueButton();
    addMyMilestoneButton();
  }

  if (onIssuePage) {
    addSubIssueButton();
    addGyazoButton();
    addElephantReminderButton();
  }

  if (onNewIssuePage) {
    addGyazoButton();
    autoSelectionBetweenBrackets();
  }

  return true;
});
