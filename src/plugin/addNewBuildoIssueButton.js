import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addNewBuildoIssueButton() {

  const newIssueButton = $('a.btn:contains(New issue)');
  newIssueButton.removeClass('btn-primary');

  const newIssueURL = newIssueButton.prop('href');

  const newBuildoIssueButton = $(`
    <button class="btn btn-primary select-menu-button js-menu-target buildo-new-issue-button right" type="button" aria-haspopup="true">
      New buildo issue
    </button>
  `);

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

  $('.buildo-new-issue-button').remove();
  newBuildoIssueButton.insertBefore(newIssueButton);
  newIssueOptions.insertAfter(newBuildoIssueButton);

  newBuildoIssueButton.on('click', () => newIssueOptions.toggle());

  issueTypes.forEach(({ className, templateName, labels }) => {
    $(`.${className}`).on('click', () => {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.onNewIssuePage) {
          prefillIssueWithTemplate({ templateName, labels });
        }
      });
    });
  });

}
