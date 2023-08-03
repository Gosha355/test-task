const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let activeTimer = null
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {  
  return (seconds) => {activeTimer = setInterval(function() {
      let formattedSeconds = seconds % 60
      let minutes = seconds /60 % 60
      let hours = seconds / 60 / 60 % 60
      let formattedMinutes = Math.trunc(minutes)
      let formattedHours = Math.trunc(hours)
      if (formattedSeconds < 10) {
        formattedSeconds = `0${formattedSeconds}`;
      };
      if (formattedMinutes < 10) {
        formattedMinutes = `0${formattedMinutes}`;
      };
      if (formattedHours < 10) {
        formattedHours = `0${formattedHours}`;
      };
      if (seconds <= 0) {
        clearInterval(activeTimer);
        timerEl.innerHTML = `00:00:00`;
        alert('Время закончилось')
      } else {
        const strTimer = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        timerEl.innerHTML = strTimer;
      };
      --seconds;
      },1000)
    };
  //  заводим таймер, через каждую секунду уменьшаем seconds на 1
  // если значение однозначное добовляем ноль
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  const parsedValue = parseInt(event.currentTarget.value, 10)
  if (!Number.isInteger(parsedValue) || Number.isNaN(parsedValue)) {
     event.currentTarget.value = '';
  } else {
     event.currentTarget.value = parsedValue;
  }
  // Очистите input так, чтобы в значении
  // оставались только числа 
});

buttonEl.addEventListener('click', () => {
  if (activeTimer !== null) {
    clearInterval(activeTimer)
  }
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  

  inputEl.value = '';
});
