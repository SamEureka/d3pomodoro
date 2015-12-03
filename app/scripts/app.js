// Global vars
var interval = null;
var range = 3;
var run = false;

// Sets a time key/value pair in session storage
function setTime(vTime) {
  sessionStorage.setItem('time', vTime);
}

// Retreives the time value from session storage
function getTime() {
  var time = sessionStorage.getItem('time');
  return time;
}

// Decrements the time value in session storage 
function decTime() {
  var dt = getTime();
  dt--;
  setTime(dt);
}

// Sets time to 30 seconds and starts the interval
function startTimer() {
  noThumb();
  check();
  greyThat();
  run = true;
}

// Starts it or tells the console that things are already running
var check = function() {
  getTime() === range.toString() ? interval = setInterval(timer, 1000) : console.log('Dude, you already clicked it!');
  // run = true;
};

// Checks if time value is 0, if 0 we are done, if not decrement time and display
function timer() {
  getTime() === '0' ? done() : decTime();
  displayTime();
}

// Resets the timer
function reset() {
  clearInterval(interval);
  setTime(range);
  noThumb();
  run = false;
  displayTime();
  updateData();
  clearData();
  greyThat();
}

function resetCheck() {
  if (run === true){
    reset();
  } else {
    console.log("Nope!");
  }
}

// Displays the time
function displayTime() {
  d3.select('#out').text(getTime());
}

// Displays giant thumb when you hit 0
function done() {
  clearInterval(interval);
  setTime(range);
  run = false;
  sessionStorage.setItem('taskComplete', JSON.stringify(true));
  updateData();
  clearData();
  greyThat();
  d3.select('#done').html('<i class="fa fa-thumbs-o-up green"></i>');
}

// Turns the thumb into the ban symbol
function noThumb() {
  d3.select('#done').html('<i class="fa fa-ban red"></i>');
}

function greyThat() {
    if (run) {
      d3.select('#clock').attr('class', 'fa fa-clock-o light-grey');
    } else {
      d3.select('#clock').attr('class', 'fa fa-clock-o grey');
    }
  }

function toggleList(toggle){
  toggle == 'on' ? d3.select('#slidedown').attr('class', 'on'):d3.select('#slidedown').attr('class', 'off');  
}


// closes
d3.select('#close').on('click', toggleList);

// reverses
d3.select('#reverse').on('click', reverseIt);

d3.select('#taskInput').on('input', function(){
  sessionStorage.setItem('taskText', JSON.stringify(this.value));
});

// store tasks details in session storage

function clearData() {
  sessionStorage.removeItem('taskTime');
  sessionStorage.removeItem('taskComplete');
  sessionStorage.removeItem('taskText');
}


function taskDetails() {
  toggleList('off');
  sessionStorage.setItem('taskTime', JSON.stringify(new Date().getTime()));
  sessionStorage.setItem('taskComplete', JSON.stringify(false));
  startTimer()
}

// Add task code
var updateData = function(){
  var TaskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
  currentTask = {
    'id': JSON.parse(sessionStorage.getItem('taskTime')),
    //'task': document.getElementById('taskInput').value,
    'task': JSON.parse(sessionStorage.getItem('taskText')),
    'complete': JSON.parse(sessionStorage.getItem('taskComplete'))
  };
  document.getElementById('taskInput').value = "";
  TaskArray.push(currentTask);
  localStorage.setItem('taskArray', JSON.stringify(TaskArray));
  taskList();
};


// Code from app.js
function taskList(){
  var data = JSON.parse(localStorage.getItem('taskArray')) || [];
  d3.select('#task-list').selectAll('*').remove();
  d3.select('#task-list')
    .selectAll('ul')
    .data(data)
    .enter()
    .append('li')
    .attr('class', 'task')

      .html(function(d){return d.complete == true ? junkFactory('done'):junkFactory('reset');})
      .append('span')
      .text(function(d){return d.task;});
}

// Reverse sort the task list
function reverseIt() {
  var reverseTemp = JSON.parse(localStorage.getItem('taskArray')) || [];
  reverseTemp.reverse();
  localStorage.setItem('taskArray', JSON.stringify(reverseTemp));
  taskList();
}
d3.select('#list').on('click', function(){toggleList('on');});
d3.select('#clock').on('click', startTimer);
d3.select('#please').on('click', startTimer);
d3.select('#done').on('click', resetCheck);





document.addEventListener('DOMContentLoaded', function() {
  setTime(range);
  displayTime();
 taskList();
});