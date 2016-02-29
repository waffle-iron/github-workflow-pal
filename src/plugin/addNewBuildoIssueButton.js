import $ from 'jquery';

export default function addNewBuildoIssueButton() {
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const newIssueButton = $(`a[href="${repoURL}/issues/new"].btn:contains(New issue)`);

  const newIssueURL = `${repoURL}/issues/new`;

  const isSmall = newIssueButton.hasClass('btn-sm');
  const smallClass = isSmall ? 'btn-sm' : '';

  const newBuildoIssueButton = $(`
    <button class="btn btn-primary ${smallClass} select-menu-button js-menu-target buildo-new-issue-button right" type="button" aria-haspopup="true">
      New buildo issue
    </button>
  `);

  const optionsStyle = 'top: 34px; right: 0px';

  const issueTypes = [{
    title: 'New bug',
    icon: 'bug',
    className: 'buildo-new-bug-button',
    templateName: 'bug',
    titleTemplate: {},
    labels: ['bug']
  }, {
    title: 'New defect',
    icon: 'alert',
    className: 'buildo-new-defect-button',
    templateName: 'defect',
    titleTemplate: {},
    labels: ['defect']
  }, {
    title: 'New feature',
    icon: 'paintcan',
    className: 'buildo-new-feature-button',
    templateName: 'feature',
    titleTemplate: {
      title: '[{topic}] {title}',
      selection: '{topic}'
    },
    labels: []
  }];

  const options = issueTypes.reduce((opts, { className, icon, title }) => `
    ${opts}
    <a class="select-menu-item js-navigation-item ${className}">
      <div class="select-menu-item-text">
        <span class="octicon octicon-${icon}"></span>
        ${title}
      </div>
    </a>
  `, '');

  const newIssueOptions = $(`
    <div style="${optionsStyle}" class="select-menu-modal-holder js-menu-content js-navigation-container js-active-navigation-container buildo-new-issue-options" aria-hidden="false">
      <div class="select-menu-modal" style="width: 200px">
        <div class="select-menu-list">${options}</div>
      </div>
    </div>
  `);

  if ($('.buildo-new-issue-button').length === 0) {
    newBuildoIssueButton.insertAfter(newIssueButton);
    newIssueOptions.insertAfter(newBuildoIssueButton);
  }
  if ($(newIssueButton).length > 0) {
    newIssueButton.remove(); // remove default GitHub button
  }

  $('.buildo-new-issue-button').on('click', e => {
    newIssueOptions.toggle();
    e.stopPropagation();
  });

  $('.buildo-new-issue-options').on('click', e => e.stopPropagation());

  $(document.body).on('click', () => $('.buildo-new-issue-options').hide());
  $(document.body).on('keydown.goToFeature', ({ keyCode, shiftKey, altKey, ctrlKey, metaKey }) => {
    if (keyCode === 67 && !shiftKey && !altKey && !ctrlKey && !metaKey) {
      $(document.body).off('keydown.goToFeature');
      $('.buildo-new-feature-button').click();
    }
  })

  issueTypes.forEach(issue => $(`.${issue.className}`).on('click', () => {
    const query = `?templateName=${issue.templateName}&labels=${[].concat(issue.labels).join(';')}&title=${issue.titleTemplate.title || ''}&titleSelection=${issue.titleTemplate.selection || ''}`;
    window.location.href = `${newIssueURL}${query}`;
  }));

}
