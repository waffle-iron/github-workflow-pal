import $ from 'jquery';

const GYAZO_API_URL = 'https://api.gyazo.com/api/images';
const TOKEN_KEY = 'gyazo_access_token';
const EDITOR_SEL = '.write-content'
const TEXTAREA_SEL = '.comment-form-textarea';
const REMOVE_ERROR_TIMEOUT = 3000;
const GIF_BTN_LABEL = 'ADD GIF';
const GIF_BTN_SEL = '.buildo-gyazo-gif';
const GIF_BTN_CLASS = GIF_BTN_SEL.slice(1);
const SETTINGS_BTN_SEL = '.buildo-gyazo-gif-update-token';
const SETTINGS_BTN_CLASS = SETTINGS_BTN_SEL.slice(1);
const INPUT_SEL = '.buildo-gyazo-token-input';
const INPUT_CLASS = INPUT_SEL.slice(1);
const CONFIRM_TOKEN_BTN_SEL = '.buido-gyazo-confirm-token';
const CONFIRM_TOKEN_BTN_CLASS = CONFIRM_TOKEN_BTN_SEL.slice(1);

export default function addGyazoButton() {

  const fetchLastImage = ({ access_token }) => $.getJSON(GYAZO_API_URL, { access_token, per_page: 1 }).then(([{ url }]) => url);

  const updateToken = ({ access_token }) => localStorage.setItem(TOKEN_KEY, access_token);
  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const template = ({ imageURL }) => `![](${imageURL})`;

  const addError = ({ $elem }) => $elem.text('ERROR!').addClass('error');
  const removeError = ({ $elem }) => $elem.text(GIF_BTN_LABEL).removeClass('error');
  const showError = ({ $elem }) => {
    addError({ $elem });
    setTimeout(function() { removeError({ $elem }) }, REMOVE_ERROR_TIMEOUT)
  };

  const $gifButton = $('<div />')
    .text(GIF_BTN_LABEL)
    .addClass(GIF_BTN_CLASS)
    .addClass('btn btn-sm');

  const $tokenInput = $('<input type="text" placeholder="set GYAZO access_token"/>')
    .addClass(INPUT_CLASS)
    .val(getToken())
    .hide();

  const $tokenInputBtn = $('<div />')
    .text('✓')
    .addClass('btn btn-sm')
    .addClass(CONFIRM_TOKEN_BTN_CLASS)
    .hide();

  const $settingsBtn = $('<div />')
    .text('⚙')
    .addClass('btn btn-sm')
    .addClass(SETTINGS_BTN_CLASS);

  const $wrapper = $('<div />')
    .append($gifButton)
    .append($settingsBtn)
    .append($tokenInput)
    .append($tokenInputBtn);

  $(EDITOR_SEL).prepend($wrapper);

  const appendTemplate = function({ imageURL, $elem })  {
    const $textarea = $elem.parent().siblings(TEXTAREA_SEL);
    const oldText = $textarea.val();
    const newText = oldText.concat('\n').concat(template({ imageURL }));
    $textarea.val(newText);
  };

  const addGIF = function({ access_token, $elem }) {
    return !!access_token && fetchLastImage({ access_token })
      .done(function(imageURL) { appendTemplate({ imageURL, $elem }); })
      .fail(function() { showError({ $elem }) });
  }

  const toggleSettingsClick = function({ $elem }) {
    $($elem || this)
      .siblings(INPUT_SEL).toggle().val(getToken())
      .siblings(CONFIRM_TOKEN_BTN_SEL).toggle();
  }

  const onGifBtnClick = function() {
    addGIF({ access_token: getToken(), $elem: $(this) }) || toggleSettingsClick()
  }

  const onUpdateTokenBtnClick = function() {
    updateToken({ access_token: $tokenInput.val() });
    toggleSettingsClick({ $elem: $(this) });
  };

  $(document).on('click', GIF_BTN_SEL, onGifBtnClick);
  $(document).on('click', SETTINGS_BTN_SEL, toggleSettingsClick);
  $(document).on('click', CONFIRM_TOKEN_BTN_SEL, onUpdateTokenBtnClick)

}
