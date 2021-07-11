import Swal from 'sweetalert2';

const refs = {
  dateSelector: document.getElementById('date-selector'),
  startBtn: document.querySelector('[data-timer]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};

let IntervalId;

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

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startTimer);
refs.dateSelector.addEventListener('change', checkDate);

function checkDate() {
  const currentDate = Date.now();
  const inputdate = refs.dateSelector.value;
  const selectedDate = new Date(inputdate);
  const deltaTime = selectedDate - currentDate;

  if (deltaTime < 0) {
    refs.startBtn.disabled = true;
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Cool',
    });
  } else {
    refs.startBtn.disabled = false;
  }
}

function startTimer() {
  IntervalId = setInterval(() => {
    count();
  }, 1000);
}

function count() {
  const currentDate = Date.now();
  const inputdate = refs.dateSelector.value;
  const selectedDate = new Date(inputdate);
  const deltaTime = selectedDate - currentDate;

  updateTimerface(convertMs(deltaTime));

  if (deltaTime < 0) {
    clearInterval(IntervalId);
    updateTimerface(convertMs(0));
    refs.startBtn.disabled = true;
  }
}

function updateTimerface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}



