import $ from 'jquery';

export default function addMyMilestoneButton() {
  const user = $('a.header-nav-link.name').attr('href').replace('/', '');
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const href = `${repoURL}/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22this+week%22+assignee%3A${user}`;

  const milestonesButton = $(`a[href="${repoURL}/milestones"].subnav-item`);

  const newMyMilestoneButton = $(`
    <a href="${href}" class="js-selected-navigation-item subnav-item my-milestone-button">
      My Milestone
    </a>
  `);

  $('.my-milestone-button').remove();
  newMyMilestoneButton.insertAfter(milestonesButton);
}
