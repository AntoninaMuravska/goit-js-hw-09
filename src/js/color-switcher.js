const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

let intervalId;
let isActive = false;

// Для генерации случайного цвета используй функцию getRandomHexColor.
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

refs.startBtn.addEventListener('click', startChangeBodyColor);
refs.stopBtn.addEventListener('click', stopChangeBodyColor);

function startChangeBodyColor() {
  if (isActive) {
    return;
  }

  isActive = true;
  refs.startBtn.disabled = true;
  intervalId = setInterval(changeColor, 1000);
}

function stopChangeBodyColor() {
  isActive = false;
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
}

function changeColor() {
  let randomColor = getRandomHexColor();
  refs.body.style.backgroundColor = randomColor;
}
