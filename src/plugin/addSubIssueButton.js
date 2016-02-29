import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addSubIssueButton() {
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const newIssueURL = `${repoURL}/issues/new`;

  const labels = $('.labels.css-truncate > a')
    .toArray()
    .map(x => x.innerHTML)
    .filter(x => x !== 'macro');

  const sideBar = $('#partial-discussion-sidebar');
  const milestone = $('.milestone-name').prop('title');
  const parentIssueNo = $('.gh-header-number').text().replace('#', '');

  const query = `?templateName=sub-issue&labels=${labels.join(';')}&parentIssueNo=${parentIssueNo}&milestone=${milestone}`;
  const newSubIssueButton = $(`
    <a
      href="${newIssueURL}${query}"
      class="btn btn-sm buildo-new-sub-issue-button"
      style="margin-top: 20px; width: 100%; text-align: center;"
    >
      <span class="octicon octicon-tasklist"></span>
      New sub-issue
    </a>
  `);

  $('.buildo-new-sub-issue-button').remove();
  sideBar.append(newSubIssueButton);
}
