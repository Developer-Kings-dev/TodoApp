// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Task Array (to store tasks)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Save Tasks to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Filter Tasks
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    renderTasks(button.dataset.filter);
  });
});

// Initial Render
renderTasks();
