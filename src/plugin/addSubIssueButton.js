import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addSubIssueButton() {

  const sideBar = $('#partial-discussion-sidebar');

  const newIssueButton = $('a.btn:contains(New issue)');
  const newIssueURL = newIssueButton.prop('href');

  const newSubIssueButton = $(`
    <a
      href="${newIssueURL}"
      class="btn btn-sm buildo-new-sub-issue-button"
      style="margin-top: 20px; width: 100%; text-align: center;"
    >
      <span class="octicon octicon-tasklist"></span>
      New sub-issue
    </a>
  `);

  $('.buildo-new-sub-issue-button').remove();
  sideBar.append(newSubIssueButton);

  const labels = $('.labels.css-truncate > a')
    .map((_, x) => x.innerHTML)
    .filter(x => x !== 'macro')
    .toArray();

  const milestone = $('.milestone-name').prop('title');

  const parentIssueNo = $('.gh-header-number').text().replace('#', '');
  const templateVariables = { parentIssueNo };

  $('.buildo-new-sub-issue-button').on('click', () => {
    chrome.runtime.onMessage.addListener(function listener (message) {
      if (message.onNewIssuePage) {
        prefillIssueWithTemplate({ templateName: 'sub-issue', templateVariables, labels, milestone });
        chrome.runtime.onMessage.removeListener(listener);
      }
    });
  });
}
