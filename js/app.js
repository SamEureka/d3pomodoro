// d3Pomodoro 

// Global vars
var interval = null;
var range = 5;
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
  taskDetails();
  noThumb();
  check();
  run = true;
  whatever();
}

// Displays the current task
function whatever() {
  var taskTemp = JSON.parse(sessionStorage.getItem('taskText'));
  taskTemp === null ? taskTemp = "Task - " + JSON.parse(sessionStorage.getItem('taskTime')) : console.log("Whatever.");
  d3.select('#whatever').html(taskTemp);
}

// Starts it or tells the console that things are already running
var check = function() {
  run === false ? interval = setInterval(timer, 1000) : console.log('Dude, you already clicked it!');
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
}

// If the timer is running when you click reset we are good
function resetCheck() {
  run === true ? reset() : console.log("Nope!");
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
  d3.select('#done').html('<i class="fa fa-thumbs-o-up green"></i>');
  d3.select('#clock').html('<i class="fa fa-clock-o grey"></i>');
  d3.select('#whatever').html('');
}

// Turns the thumb into the ban symbol
function noThumb() {
  d3.select('#done').html('<i class="fa fa-ban red"></i>');
  d3.select('#clock').html('<i class="fa fa-clock-o light-grey"></i>');
  d3.select('#whatever').html('');
}

// Slides the tasklist stuff down
function toggleList(toggle){
  toggle == 'on' ? d3.select('#slidedown').attr('class', 'on'):d3.select('#slidedown').attr('class', 'off');  
}


// Clears details from session storage
function clearData() {
  sessionStorage.removeItem('taskTime');
  sessionStorage.removeItem('taskComplete');
  sessionStorage.removeItem('taskText');
}

// Stores the task details in session storage
function taskDetails() {
  toggleList('off');
  sessionStorage.setItem('taskTime', JSON.stringify(new Date().getTime()));
  sessionStorage.setItem('taskComplete', JSON.stringify(false));
}

// Update the task array
var updateData = function(){
  var TaskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
  var taskTemp = JSON.parse(sessionStorage.getItem('taskText'));
    taskTemp === null ? taskTemp = "Task - " + JSON.parse(sessionStorage.getItem('taskTime')) : console.log("We're good.");
  currentTask = {
    'id': JSON.parse(sessionStorage.getItem('taskTime')),
    'task': taskTemp,
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

// Event handlers
d3.select('#list').on('click', function(){toggleList('on');});
d3.selectAll('#clock, #please').on('click', startTimer);
d3.select('#done').on('click', resetCheck);
d3.select('#close').on('click', toggleList);
d3.select('#reverse').on('click', reverseIt);
d3.select('#taskInput').on('input', function(){sessionStorage.setItem('taskText', JSON.stringify(this.value));}).on('keydown', function(){var keyEvent = d3.event; if (keyEvent.keyCode === 13){startTimer()}});

// Set things up when document loads
document.addEventListener('DOMContentLoaded', function() {
  setTime(range);
  displayTime();
 taskList();

});