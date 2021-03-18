'user strict'; 
{
  
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  let startTime;
  let elapsedTime = 0;
  let timerId;
  let timeToadd = 0;
  
  function updateTimeText() {
    
    const h = Math.floor(elapsedTime / 3600000);
    const m = Math.floor(elapsedTime / 60000);
    const s = Math.floor(elapsedTime % 60000 / 1000);
    const ms = elapsedTime % 1000;
    
    timer.textContent =  h + ":" + m + ":" + s + ":" + ms;
  }
  
  function countUp() {
    
    timerId = setTimeout(function() {
      elapsedTime = Date.now() - startTime + timeToadd;
      updateTimeText();
      countUp();
      
    }, 10);
  }
  
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }


  setButtonStateInitial();
  
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
    
  });
  
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    
    setButtonStateStopped();
    clearTimeout(timerId);
    timeToadd += Date.now() - startTime;
    
  });
  
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') ===true) {
      return;
    }
    
    setButtonStateInitial();
    timer.textContent = '0:0:0:0';
    elapsedTime = 0;
    
  });
  
};
