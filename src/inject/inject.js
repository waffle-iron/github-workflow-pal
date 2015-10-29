chrome.runtime.onMessage.addListener(function(message) {
  if (message.onPRPage) {
    var allChecked = function () {
      return $('input.buildo:checkbox').length === $('.buildo:checkbox:checked').length
    };

    var hasLabel = function (label) {
      return $('.label').filter(function() { return $(this).text() === label }).length
    };

    var checkbox = function (text) {
      return $('<li class="task-list-item"><input type="checkbox" class="buildo"/>' + text + '</li>');
    };

    var mergeButton = $('.btn.js-merge-branch-action')

    mergeButton.prop('disabled', true);

    var wrapper = $('<div class="buildo-gh-workflow"></div>');
    var listWrapper = $('<div class="comment-body markdown-body markdown-format js-comment-body">');
    var taskList = $('<ul class="task-list">');
    if (hasLabel('specs')) {
      checkbox("Requirements are in sync").appendTo(taskList);
      checkbox("Specs are in sync").appendTo(taskList);
    }
    checkbox("Test plan checked").appendTo(taskList);

    taskList.appendTo(listWrapper);
    $('<h4 class="status-heading"><span class="buildo octicon octicon-list-unordered"></span>Have you checked the following?</h4>').appendTo(wrapper);
    listWrapper.appendTo(wrapper);

    $('.merge-message div.buildo-gh-workflow').remove();
    wrapper.prependTo($('.merge-message'));

    $('.buildo').click(function(e) {
      mergeButton.prop('disabled', !allChecked());
    });
 };
 return true;
});
