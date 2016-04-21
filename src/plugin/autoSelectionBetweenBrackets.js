import $ from 'jquery';
import querystring from 'query-string';
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
    const { title, titleSelection } = querystring.parse(window.location.search);

    const issueTitle = $('.composer [name="issue[title]"]');
    const issueBody = $('.composer [name="issue[body]"]');

    enableActivePlaceholders(issueBody, issueTitle);
    issueTitle.click();
    setSelection(issueTitle, { title, selection: titleSelection });

  });

}
