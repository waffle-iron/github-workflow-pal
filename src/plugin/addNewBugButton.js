import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

export default function addNewBugButton() {

  const newBugButton = $(`
    <a href="/buildo/infra/issues/new" class="btn btn-secondary right buildo-bug-button" role="button" tabindex="0" data-hotkey="q b">New bug</a>
  `);
  newBugButton.on('click', () => {
    setTimeout(() => prefillIssueWithTemplate({
      templateName: 'bug',
      labels: ['bug']
    }), 1000);
  });

  const newIssueButton = $('a.btn-primary:contains(New issue)');

  $('.buildo-bug-button').remove();
  newIssueButton.parent().prepend(newBugButton);

}
