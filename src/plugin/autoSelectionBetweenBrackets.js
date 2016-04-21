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

function setSelection(issueTitle, { title = '', selection = '' }) {
  const issueTitleDOMElem = issueTitle[0];
  issueTitleDOMElem.setSelectionRange(...subStringRange(title, selection));
}


export default function prefillIssueWithTemplate() {

  document.arrive('.composer', {
    fireOnAttributesModification: true,
    onceOnly: true,
    existing: true
  }, () => {
    const { title, titleSelection } = parseQuery();

    const issueTitle = $('.composer [name="issue[title]"]');
    const issueBody = $('.composer [name="issue[body]"]');

    enableActivePlaceholders(issueBody, issueTitle);
    issueTitle.click();
    setSelection(issueTitle, { title, selection: titleSelection });

  });

}
