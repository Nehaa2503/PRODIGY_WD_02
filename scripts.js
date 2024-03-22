let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');
const clickSound = document.getElementById('clickSound');

function displayTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const formattedTime = 
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + ':' +
    (milliseconds < 10 ? '0' : '') + milliseconds;

  display.textContent = formattedTime;
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayTime(elapsedTime);
    }, 10);
  }
  playClickSound();
}

function pauseTimer() {
  clearInterval(timerInterval);
  startTime = null;
  playClickSound();
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  lapCount = 0;
  displayTime(elapsedTime);
  lapsList.innerHTML = '<div class="lap-header"><span class="lap-count">Lap #</span><span class="lap-time">Split Time</span><span class="total-time">Total Time</span></div>';
  playClickSound();
}

function lapTimer() {
    if (startTime) {
      lapCount++;
      const lapTime = elapsedTime;
      const lapMinutes = Math.floor((lapTime % 3600000) / 60000);
      const lapSeconds = Math.floor((lapTime % 60000) / 1000);
      const lapMilliseconds = Math.floor((lapTime % 1000) / 10);
      const lapFormattedTime = `${lapMinutes < 10 ? '0' : ''}${lapMinutes}:${lapSeconds < 10 ? '0' : ''}${lapSeconds}.${lapMilliseconds < 10 ? '0' : ''}${lapMilliseconds}`;
      const totalTime = lapCount === 1 ? elapsedTime : lapTime - parseInt(lapsList.lastElementChild.querySelector('.total-time').textContent.replace(/:/g, ''), 10);
      const totalMinutes = Math.floor(totalTime / 60000);
      const totalSeconds = Math.floor((totalTime % 60000) / 1000);
      const totalMilliseconds = Math.floor((totalTime % 1000) / 10);
      const totalFormattedTime = `${totalMinutes < 10 ? '0' : ''}${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}.${totalMilliseconds < 10 ? '0' : ''}${totalMilliseconds}`;
      const lapItem = document.createElement('div');
      lapItem.innerHTML = `<span class="lap-count">${lapCount}</span><span class="lap-time">${lapFormattedTime}</span><span class="total-time">${totalFormattedTime}</span>`;
      lapsList.appendChild(lapItem);
      playClickSound();
    }
  }
  

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

