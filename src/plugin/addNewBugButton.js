import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addNewBugButton() {

  const newIssueButton = $('a.btn-primary:contains(New issue)');

  const newIssueURL = newIssueButton.prop('href');

  const newBugButton = $(`
    <a href="${newIssueURL}" class="btn btn-secondary right buildo-bug-button" role="button" tabindex="0" data-hotkey="q b">New bug</a>
  `);
  newBugButton.on('click', () => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.onNewIssuePage) {
        prefillIssueWithTemplate({
          templateName: 'bug',
          labels: ['bug']
        });
      }
    });
  });

  $('.buildo-bug-button').remove();
  newIssueButton.parent().prepend(newBugButton);

}
