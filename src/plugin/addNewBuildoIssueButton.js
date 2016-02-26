import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addNewBuildoIssueButton() {
  const [, repoURL] = window.location.href.match(/.*(\/buildo\/[^\/]+)/);
  const newIssueButton = $(`a[href="${repoURL}/issues/new"].btn:contains(New issue)`);

  const newIssueURL = newIssueButton.prop('href');

  const isSmall = newIssueButton.hasClass('btn-sm');
  const smallClass = isSmall ? 'btn-sm' : '';

  const newBuildoIssueButton = $(`
    <button class="btn btn-primary ${smallClass} select-menu-button js-menu-target buildo-new-issue-button right" type="button" aria-haspopup="true">
      New buildo issue
    </button>
  `);

  const bindIssueTemplates = ({ templateName, labels, titleTemplate }) => () => {
    chrome.runtime.onMessage.addListener(function listener (message) {
      if (message.onNewIssuePage) {
        prefillIssueWithTemplate({ templateName, labels, titleTemplate });
        chrome.runtime.onMessage.removeListener(listener);
      }
    });
  };

  const optionsStyle = 'top: 34px; right: 0px';

  const issueTypes = [{
    title: 'New bug',
    icon: 'bug',
    className: 'buildo-new-bug-button',
    templateName: 'bug',
    labels: ['bug']
  }, {
    title: 'New defect',
    icon: 'alert',
    className: 'buildo-new-defect-button',
    templateName: 'defect',
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
    <a href="${newIssueURL}" class="select-menu-item js-navigation-item ${className}">
      <div class="select-menu-item-text">
        <span class="octicon octicon-${icon}"></span>
        ${title}
      </div>
    </a>
  `, '');

  const newIssueOptions = $(`
    <div style="${optionsStyle}" class="select-menu-modal-holder js-menu-content js-navigation-container js-active-navigation-container buildo-new-issue-button" aria-hidden="false">
      <div class="select-menu-modal" style="width: 200px">
        <div class="select-menu-list">${options}</div>
      </div>
    </div>
  `);

  $('.buildo-new-issue-button').remove(); // remove buildo-button in case it already exists
  newBuildoIssueButton.insertAfter(newIssueButton);
  newIssueOptions.insertAfter(newBuildoIssueButton);

  newIssueButton.remove(); // remove default GitHub button

  newBuildoIssueButton.on('click', () => newIssueOptions.toggle());

  $(document.body).on('keydown.goToFeature', ({ keyCode, shiftKey }) => {
    if (keyCode === 67 && !shiftKey) {
      bindIssueTemplates(issueTypes[2])();
      $(document.body).off('keydown.goToFeature');
    }
  })

  issueTypes.forEach( issue => $(`.${issue.className}`).on('click', bindIssueTemplates(issue)));

}
