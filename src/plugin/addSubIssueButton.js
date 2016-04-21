import $ from 'jquery';
import querystring from 'query-string';

export default function addSubIssueButton() {
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const newIssueURL = `${repoURL}/issues/new`;

  const sideBar = $('#partial-discussion-sidebar');

  const newSubIssueButton = $(`
    <a
      class="btn btn-sm buildo-new-sub-issue-button"
      style="margin-top: 20px; width: 100%; text-align: center;"
    >
      <span class="octicon octicon-tasklist"></span>
      New sub-issue
    </a>
  `);

  $('.buildo-new-sub-issue-button').remove();
  sideBar.append(newSubIssueButton);

  $('.buildo-new-sub-issue-button').on('click', () => {
    const parentIssueTitle = $('span.js-issue-title').text();

    const [, topic] = parentIssueTitle.match(/\[(.+)\] /) || [];
    const milestone = $('.milestone-name').prop('title');
    const parentIssueNumber = $('.gh-header-number').text().replace('#', '');
    const labels = $('.labels.css-truncate > a')
      .toArray()
      .map(x => x.innerHTML)
      .filter(x => x !== 'macro');

    const query = {
      milestone,
      labels,
      parentIssueNumber,
      topic,
      t: 'subIssue'
    };
    const url = `https://nemobot.our.buildo.io/templates?${querystring.stringify(query)}`;
    $.get(url, (res) => {
      window.location.href = `${newIssueURL}?${res.subIssue.computedQuery}`;
    });
  });
}
