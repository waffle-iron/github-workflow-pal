export default function enableActivePlaceholders(issueBody) {
  issueBody.click(function() {
    if (window.getSelection().toString().length) {
      return;
    }
    const position = issueBody.getCursorPosition();
    const ib = issueBody.val();
    const beforeCursor = ib.substr(0, position);
    const afterCursor = ib.substr(position);
    const afterStartBracket = beforeCursor.match(/\[[^\]]*$/);
    const beforeEndBracket = afterCursor.match(/^[^\[]*\]/);
    if (afterStartBracket && beforeEndBracket) {
      const selectFrom = position - afterStartBracket[0].length;
      const selectTo = position + beforeEndBracket[0].length;
      issueBody.selectRange(selectFrom, selectTo);
    }
  });
}
