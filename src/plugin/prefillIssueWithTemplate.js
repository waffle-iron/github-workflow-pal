import $ from 'jquery';
import enableActivePlaceholders from './enableActivePlaceholders';
require('arrive');

const subStringRange = (string, subString) => {
  const startIndex = string.search(subString);
  if (startIndex === -1) {
    return [0, 0];
  }
  const endIndex = startIndex + subString.length;
  return [startIndex, endIndex];
}

function parseQuery() {
  const queries = window.location.search.substr(1).split('&');
  return queries.reduce((acc, query) => {
    const key = decodeURIComponent(query.split('=')[0]);
    const value = decodeURIComponent(query.split('=')[1]) || '';
    return { ...acc, [key]: value };
  }, {});
}


export default function prefillIssueWithTemplate() {

  document.arrive('.composer', {
    fireOnAttributesModification: true,
    onceOnly: true,
    existing: true
  }, () => {

    const templatesPath = 'https://rawgit.com/buildo/github-workflow-pal/master/templates';
    const issueTitle = $('.composer [name="issue[title]"]');
    const issueBody = $('.composer [name="issue[body]"]');
    const labelsMenu = $('.label-select-menu > .js-menu-target');
    const milestoneMenu = $('[aria-label="Set milestone"]');

    const setMilestone = milestoneName => {
      const toggleMilestoneMenu = () => milestoneMenu.click();
      const selectMilestone = name => $(`.select-menu-item:contains(${name})`).click();
      toggleMilestoneMenu();
      document.arrive('[aria-label="Set milestone"] + .js-active-navigation-container', {
        fireOnAttributesModification: true,
        onceOnly: true,
        existing: true
      }, () => {
        selectMilestone(milestoneName);
        toggleMilestoneMenu();
      });
    }

    const setTitle = ({ title = '', selection = '' }) => {
      const issueTitleDOMElem = issueTitle[0];
      issueTitle.val(title);
      issueTitleDOMElem.setSelectionRange(...subStringRange(title, selection));
    }

    const { template, templateName, title, titleSelection, labels, milestone, ...templateVariables } = parseQuery();
    if (templateName !== 'default') {
      issueBody.prop('placeholder', 'Loading issue template...');
      $.get(`${templatesPath}/${templateName}.md`, (contents, status) => {
        if (status == 'success') {
          issueBody.prop('placeholder', 'Ignoring the issue template, aren\'t you?!');
          const body = Object.keys(templateVariables).reduce((body, k) => body.replace(RegExp(`\\$${k}`, 'g'), templateVariables[k]), contents);
          issueBody.val(body.trim());
        } else {
          issueBody.prop('placeholder', 'Couldn\'t fetch issue template. Sorry!');
        }
      });
    }

    setMilestone(milestone)
    enableActivePlaceholders(issueBody, issueTitle);
    issueTitle.click();
    setTitle({ title, selection: titleSelection });

  });

}
