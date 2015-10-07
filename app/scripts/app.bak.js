// Global variables
var interval = null,
    time = 65,
    onBreak = false,
    workUnits = 0;
    alarm = new buzz.sound("/sounds/ring.mp3", {preload: true});


// Starts the interval, calls timer function 
var startTimer = function(){
    interval = setInterval(timer, 1000);
    buttonSwap('reset');
}

// Checks the onBreak variable, decrements time, 
// sets break or resets, calls display function
var timer = function(){
  time === 0 ? reset() : time--;
  displayTime(time);
};

var reset = function(){
  clearInterval(interval);
  if (time === 0 && onBreak){
    buttonSwap('work');
    playSound();
  } else if (time === 0 && !onBreak){
    buttonSwap('break');
    workUnits++;
    playSound();
   } else if (!onBreak){
    buttonSwap('work')
  } else {
    buttonSwap('break');
  }
  displayTime(time);
};

// Converts total seconds into minutes and seconds in the desired display format
function formatTime(seconds){
    var min = Math.floor(seconds/60);
    var sec = Math.floor(seconds%60);
  min === 0 ? min = "" : min;
  sec < 10 ? sec = '0'+sec : sec;
  return min+':'+sec;
}

function resetWork(){
  if (workUnits > 4){workUnits = 0;}
}

function setBreakTime(){
  if (workUnits === 4){time = 65;} else {time = 10;}
}

// Sends time to the DOM
function displayTime(time){
 $('#displayNow').html(formatTime(time));
}

function playSound(){
alarm.play();
}

// Swaps the button and click
function buttonSwap(type){
  switch (type) {
    case 'work':
      $('#btn').attr({'class': 'btn btn-md btn-primary btn-block', value: 'Work', onclick: 'startTimer()'});
      time = 65;
      onBreak = false;
      resetWork();
      break;
    case 'break':
      $('#btn').attr({'class': 'btn btn-md btn-success btn-block', value: 'Break', onclick: 'startTimer()'});
      onBreak = true;
      setBreakTime();
      break;
    case 'reset':
      $('#btn').attr({'class': 'btn btn-md btn-danger btn-block', value: 'Reset', onclick:'reset()'});
      break;
    default:
      console.log("I don't have a button for: "+type);
  }

}

// Sets everything up when the document is ready 
$(document).ready(function(){
  displayTime(time);
});
