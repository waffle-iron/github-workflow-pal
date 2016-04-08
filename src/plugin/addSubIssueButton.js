import $ from 'jquery';

export default function addSubIssueButton() {
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const newIssueURL = `${repoURL}/issues/new`;

  const labels = $('.labels.css-truncate > a')
    .toArray()
    .map(x => x.innerHTML)
    .filter(x => x !== 'macro');

  const sideBar = $('#partial-discussion-sidebar');
  const milestone = $('.milestone-name').prop('title');
  const parentIssueTitle = $('span.js-issue-title').text();
  const parentIssueNo = $('.gh-header-number').text().replace('#', '');

  const [, topic] = parentIssueTitle.match(/(\[.+\]) /) || [];
  const title = `${topic || '[{topic}]'} {title}`;
  const titleSelection = topic ? '{title}' : '{topic}';

  const query = `?templateName=sub-issue&labels[]=${labels.join('&labels[]=')}&parentIssueNo=${parentIssueNo}&milestone=${milestone}&title=${title}&titleSelection=${titleSelection}`;
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
