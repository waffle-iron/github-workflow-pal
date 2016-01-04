import $ from 'jquery';
import prefillIssueWithTemplate from './prefillIssueWithTemplate';

$.fn.selectRange = function(start, end) {
  return this.each(function() {
    if(this.setSelectionRange) {
      this.focus();
      this.setSelectionRange(start, end);
    } else if(this.createTextRange) {
      const range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

$.fn.getCursorPosition = function() {
  const el = $(this).get(0);
  let pos = 0;
  if('selectionStart' in el) {
    pos = el.selectionStart;
  } else if('selection' in document) {
    el.focus();
    const sel = document.selection.createRange();
    const selLength = document.selection.createRange().text.length;
    sel.moveStart('character', -el.value.length);
    pos = sel.text.length - selLength;
  }
  return pos;
};

export default function addNewBugButton() {

  const newBugButton = $(`
    <a href="/buildo/infra/issues/new" class="btn btn-secondary right buildo-bug-button" role="button" tabindex="0" data-hotkey="q b">New bug</a>
  `);
  newBugButton.on('click', () => {
    setTimeout(() => prefillIssueWithTemplate({
      templateName: 'template',
      labels: ['bug']
    }), 1000);
  });

  const newIssueButton = $('a.btn-primary:contains(New issue)');

  $('.buildo-bug-button').remove();
  newIssueButton.parent().prepend(newBugButton);

}
