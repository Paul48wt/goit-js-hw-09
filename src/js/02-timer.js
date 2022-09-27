// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
let startTime = 0;
let timerId = null;
const INTERVAL = 1000;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    const date = new Date();
    if (date > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      startBtn.addEventListener('click', startCounter);
    }
    startTime = selectedDates[0].getTime() - date.getTime();
    // updateClockFace(
    //   convertMs(timerCounter(selectedDates[0].getTime() - date.getTime()))
    // );
  },
};

flatpickr('#datetime-picker', options);

function startCounter() {
  timerCounter(startTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function timerCounter(ms) {
  let timer = ms;
  timerId = setInterval(() => {
    timer = timer - INTERVAL;
    updateClockFace(convertMs(timer));
    if (timer <= 1000) {
      clearInterval(timerId);
    }
  }, INTERVAL);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
