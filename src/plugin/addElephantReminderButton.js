import $ from 'jquery';
import querystring from 'query-string';

const BUTTON_CLASS = 'elephant-reminder-button';
const BUTTON_SEL = `.${BUTTON_CLASS}`;

const DATEINPUT_CLASS = 'elephant-reminder-date-input';
const DATEINPUT_SEL = `.${DATEINPUT_CLASS}`

const TEXT_CLASS = 'elephant-reminder-text';
const TEXT_SEL = TEXT_CLASS;

const URL = 'https://elephant.our.buildo.io';

export default function addElephantReminderButton() {
  const [, repo, /*type*/, issueNo] = window.location.href.match(/.*(buildo\/[^\/]+)\/(issues|pull)\/([\d]+)/);
  const userId = $('a.header-nav-link.name').attr('href').replace('/', '');

  const sideBar = $('#partial-discussion-sidebar');

  const $text = $(`<div />`);

  const $reminderButton = $(`<a class="btn btn-sm" />`);

  const $dateInput = $(`
    <input type="text" class="form-control"
      value="in 3 hours"
      placeholder="in 3 hours, tomorrow morning..."
    />
  `)

  const addReminder = ({ repo, userId, issueNo, date, type = 'always' }) => {
    const url = `${URL}/reminders?${querystring.stringify({ repo, userId, issueNo, date, type })}`;
    return $.post(url, ({ reminders: [reminder], message })  => {
      if (reminder) {
        displayButtonWithReminder(reminder)
      }
      else alert(message);
    });
  };

  const displayDate = (date) => {
    const jsDate = new Date(date)
    return `
      ${jsDate.toDateString()}
      at ${jsDate.toTimeString()}
    `;
  };

  const displayButtonWithReminder = (reminder) => {
    $reminderButton
      .text(`🐘 I'll remind you`)
      .addClass('btn-primary disabled')
    $dateInput.remove();
    $text.html(`You have a reminder for ${displayDate(reminder.date)}`);
    if (secondsToTime(reminder.date) < 60) {
      showCountdownTo(reminder);
    }
  };

  const getReminders = ({ repo, userId, issueNo }) => {
    const url = `${URL}/reminders?${querystring.stringify({ repo, userId, issueNo })}`;
    $.get(url, ({ reminders: [reminder] }) => {
      if (reminder) {
        displayButtonWithReminder(reminder);
      }
    });
  };

  const secondsToTime = (time) => Math.floor((time - Date.now()) / 1000);

  const showCountdownTo = (reminder) => {
    let reminded = false;
    setInterval(() => {
      const timeLeft = secondsToTime(reminder.date);
      if (timeLeft > 0) {
        $text.text(`You have a reminder in ${timeLeft} second${timeLeft > 1 ? 's' : ''}`);
      } else {
        if (!reminded) {
          init();
          reminded = true;
        }
      }
    }, 1000)
  };

 const init = () => {
   const params = {
     repo,
     userId,
     issueNo
   };
    $(BUTTON_SEL).remove();
    $(DATEINPUT_SEL).remove();
    $(TEXT_SEL).remove();
    const onEnter = () => addReminder({ ...params, date: $dateInput.val(), type: 'always' });
    sideBar.append($text);
    sideBar.append($dateInput);
    sideBar.append($reminderButton);
    $dateInput.addClass(DATEINPUT_CLASS);
    $text.addClass(TEXT_CLASS).text(`I'll remind you to check this thread`);
    $reminderButton.removeClass('btn-primary disabled').addClass(BUTTON_CLASS).text('🐘 Remind me!');
    $reminderButton.on('click', onEnter);
    $dateInput.on('keypress', ({ charCode: k }) => {
      if (k === 13) {
        onEnter();
      }
       return true;
    });
    getReminders(params);
    $dateInput.on('click', () => $dateInput.select());
    $(document).on('keydown', (e) => {
      if (e.keyCode === 192 && e.metaKey) {  // press `cmd + §` to focus the input
        $dateInput.select().focus();
      }
      return true;
    });
  };

  init();

}
