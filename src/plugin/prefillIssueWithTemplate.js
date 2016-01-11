import $ from 'jquery';
import enableActivePlaceholders from './enableActivePlaceholders';
require('arrive');

export default function prefillIssueWithTemplate({ templateName, templateVariables = {}, labels = [], milestone }) {

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

    const setLabels = (labelNames) => {
      const toggleLabelsMenu = () => labelsMenu.click();
      const selectLabels = (names) => {
        names.forEach(name => $(`.select-menu-item:contains(${name})`).click());
      };
      toggleLabelsMenu();
      document.arrive('.label-select-menu.active', {
        fireOnAttributesModification: true,
        onceOnly: true,
        existing: true
      }, () => {
        selectLabels(labelNames);
        toggleLabelsMenu();
      });
    };

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

    setLabels(labels);
    setMilestone(milestone)
    enableActivePlaceholders(issueBody);
    issueTitle.click();

  });

}
