import $ from 'jquery';

const GYAZO_API_URL = 'https://api.gyazo.com/api/images';
const EDITOR_SEL = '.write-content'
const TEXTAREA_SEL = '.comment-form-textarea';
const REMOVE_ERROR_TIMEOUT = 3000;
const GIF_BTN_LABEL = 'GIF ⇧⌘V';
const GIF_BTN_SEL = '.buildo-gyazo-gif';
const GIF_BTN_CLASS = GIF_BTN_SEL.slice(1);
const WRAPPER_SEL = '.buildo-gyazo-wrapper';
const WRAPPER_CLASS = WRAPPER_SEL.slice(1);

export default function addGyazoButton() {

  const fetchLastImage = ({ access_token }) => $.getJSON(GYAZO_API_URL, { access_token, per_page: 1 }).then(([{ url }]) => url);

  // init token
  chrome.storage.sync.get({ accessToken: '' }, ({ accessToken }) => {
    if (accessToken) {
      const template = ({ imageURL }) => `![](${imageURL})`;

      const addError = ({ $elem }) => $elem.text('ERROR!').addClass('error');
      const removeError = ({ $elem }) => $elem.text(GIF_BTN_LABEL).removeClass('error');
      const showError = ({ $elem }) => {
        addError({ $elem });
        setTimeout(function() { removeError({ $elem }) }, REMOVE_ERROR_TIMEOUT)
      };

      $(WRAPPER_SEL).remove();

      $(document).off('click.onGifBtnClick');

      const $gifButton = $('<div />')
        .text(GIF_BTN_LABEL)
        .addClass(GIF_BTN_CLASS)
        .addClass('btn btn-sm');

      const $wrapper = $('<div />')
        .addClass(WRAPPER_CLASS)
        .append($gifButton);

      $(EDITOR_SEL).prepend($wrapper);

      const appendTemplate = ({ imageURL, $elem }) => {
        const $textarea = $elem.parent().siblings(TEXTAREA_SEL);
        const oldText = $textarea.val();
        const newText = oldText.concat('\n').concat(template({ imageURL }));
        $textarea.val(newText);
      };

      const addGIF = ({ access_token, $elem }) => (
        fetchLastImage({ access_token })
          .done((imageURL) => appendTemplate({ imageURL, $elem }))
          .fail(() => showError({ $elem }))
      );

      const onGifBtnClick = function() { addGIF({ access_token: accessToken, $elem: $(this) }); }

      $(document).on('click.onGifBtnClick', GIF_BTN_SEL, onGifBtnClick);

      $(TEXTAREA_SEL).off('focus.textareaFocus');

      $(TEXTAREA_SEL).on('focus.textareaFocus', function () {
        const $closestButton = $(this).siblings(WRAPPER_SEL).find(GIF_BTN_SEL);
        $(this).on('keydown.pasteGyazoImage', e => {
          if (e.keyCode ===  86 && e.shiftKey && e.metaKey) {
            e.preventDefault();
            $closestButton.trigger('click.onGifBtnClick');
          }
        });
        $(TEXTAREA_SEL).on('blur.textareaBlur', function() {
          $(this).off('keydown.pasteGyazoImage');
        })
      });
    }
  });
}
