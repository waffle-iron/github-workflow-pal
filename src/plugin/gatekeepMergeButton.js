import $ from 'jquery';

export default function gatekeepMergeButton() {
  const allChecked = function () {
    return $('input.buildo:checkbox').length === $('.buildo:checkbox:checked').length
  };

  const hasLabel = function (label) {
    return $('.label').filter(function() { return $(this).text() === label }).length
  };

  const checkbox = function (text) {
    return $(`<li class="task-list-item"><input type="checkbox" class="buildo"/>${text}</li>`);
  };

  const mergeButton = $('.btn.js-merge-branch-action')

  mergeButton.prop('disabled', true);

  const wrapper = $('<div class="buildo-gh-workflow"></div>');
  const listWrapper = $('<div class="comment-body markdown-body markdown-format js-comment-body">');
  const taskList = $('<ul class="task-list">');
  if (hasLabel('specs')) {
    checkbox('Requirements are in sync').appendTo(taskList);
    checkbox('Specs are in sync').appendTo(taskList);
  }
  checkbox('Test plan checked').appendTo(taskList);

  taskList.appendTo(listWrapper);
  $('<h4 class="status-heading"><span class="buildo octicon octicon-list-unordered"></span>Have you checked the following?</h4>').appendTo(wrapper);
  listWrapper.appendTo(wrapper);

  $('.merge-message div.buildo-gh-workflow').remove();
  wrapper.prependTo($('.merge-message'));

  $('.buildo').click(function() {
    mergeButton.prop('disabled', !allChecked());
  });
}
