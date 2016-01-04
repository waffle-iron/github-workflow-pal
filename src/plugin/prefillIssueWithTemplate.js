import $ from 'jquery';
import enableActivePlaceholders from './enableActivePlaceholders';

export default function prefillIssueWithTemplate({ templateName, labels }) {

  const templatesPath = 'https://rawgit.com/buildo/github-workflow-pal/master/templates';
  const issueTitle = $('.composer [name="issue[title]"]');
  const issueBody = $('.composer [name="issue[body]"]');

  const setLabels = (labelNames) => {
    const toggleLabelsMenu = () => $('.label-select-menu > .js-menu-target').click();
    const selectLabels = (names) => {
      names.forEach(name => $(`.select-menu-item:contains(${name})`).click());
    };
    toggleLabelsMenu();
    selectLabels(labelNames);
    toggleLabelsMenu();
  };

  issueBody.prop('placeholder', 'Loading issue template...');

  $.get(`${templatesPath}/${templateName}.md`, (contents, status) => {
    if (status == 'success') {
      issueBody.prop('placeholder', 'Ignoring the issue template, aren\'t you?!');
      issueBody.val($.trim(contents));
    } else {
      issueBody.prop('placeholder', 'Couldn\'t fetch issue template. Sorry!');
    }
  });

  setLabels(labels);
  enableActivePlaceholders(issueBody);
  issueTitle.click();
}
