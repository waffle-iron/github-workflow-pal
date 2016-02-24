import $ from 'jquery';

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

export default function enableActivePlaceholders(...elements) {
  elements.forEach(el => el.click(function() {
    if (window.getSelection().toString().length) {
      return;
    }
    const position = el.getCursorPosition();
    const ib = el.val();
    const beforeCursor = ib.substr(0, position);
    const afterCursor = ib.substr(position);
    const afterStartBracket = beforeCursor.match(/\{[^\}]*$/);
    const beforeEndBracket = afterCursor.match(/^[^\{]*\}/);
    if (afterStartBracket && beforeEndBracket) {
      const selectFrom = position - afterStartBracket[0].length;
      const selectTo = position + beforeEndBracket[0].length;
      el.selectRange(selectFrom, selectTo);
    }
  }));
}
