let timerInterval;
let minutes = 25;
let seconds = 0;

const timerDisplay = document.querySelector(".timer");
const startButton = document.querySelector("#startBtn");
const resetButton = document.querySelector("#resetBtn");

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  // Disable the start button during the timer
  startButton.disabled = true;

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      // Timer is finished
      clearInterval(timerInterval);
      timerDisplay.textContent = "00:00";
      startButton.disabled = false;
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  // Update the timer display
  timerDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
}

function resetTimer() {
  // Clear the interval and reset the timer values
  clearInterval(timerInterval);
  minutes = 25;
  seconds = 0;
  timerDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
  startButton.disabled = false;
}

function padTime(time) {
  // Pad the time values with leading zeros if necessary (e.g., 1 becomes 01)
  return time.toString().padStart(2, "0");
}

//
//
//
//
//
//
// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value;

  console.log(taskName);

  if (taskName.trim() !== "") {
    const task = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

// add new task when Enter key pressed
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Function to mark a task as completed
function markCompleted(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  renderTasks();
  updateCompleteTask(id);
}
function updateCompleteTask(id) {
  const taskElement = document.getElementById(id);
  if (taskElement) {
    const task = tasks.find((task) => task.id === id);
    if (task.completed) {
      taskElement.classList.add("completed");
    } else {
      taskElement.classList.remove("completed");
    }
  }
}

// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    // create new list item
    const listItem = document.createElement("li");
    listItem.setAttribute("id", task.id);

    // create task name span
    const taskName = document.createElement("span");
    taskName.innerHTML = task.name;

    // create task complete button
    const completeButton = document.createElement("i");
    completeButton.classList.add("bx", "bx-check", "complete-btn");
    completeButton.addEventListener("click", () => markCompleted(task.id));

    // create task delete button
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("bx", "bxs-trash", "delete-btn");
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    // add all elements into list
    listItem.appendChild(taskName);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Initial rendering of tasks
renderTasks();
