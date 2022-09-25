const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
startBtn.addEventListener('click', onBtnStartClick);
stopBtn.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  timerId = setInterval(setBgColor, 1000);
}

function onBtnStopClick() {
  clearInterval(timerId);
}

function setBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
