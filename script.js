const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const taskItem = createTask(taskText);

  taskList.appendChild(taskItem);

  taskInput.value = "";

  // Keep the input focused after clicking Add
  taskInput.focus();
}

function createTask(taskText) {
  const li = document.createElement("li");

  const completeMark = document.createElement("span");
  completeMark.className = "complete-mark";
  completeMark.textContent = "✓";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const task = document.createElement("p");
  task.className = "task-text collapsed";
  task.textContent = taskText;

  const toggleButton = document.createElement("button");
  toggleButton.className = "toggle-text";
  toggleButton.textContent = "Show more";

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.textContent = "Complete";

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  checkTextLength(task, toggleButton);

  toggleButton.addEventListener("click", () => {
    toggleText(task, toggleButton);
  });

  completeButton.addEventListener("click", () => {
    toggleComplete(li, completeButton);
  });

  editButton.addEventListener("click", () => {
    editTask(task, toggleButton);
  });

  deleteButton.addEventListener("click", () => {
    deleteTask(li);
  });

  taskContent.append(task, toggleButton);
  actions.append(completeButton, editButton, deleteButton);
  li.append(completeMark, taskContent, actions);

  return li;
}

function toggleText(task, toggleButton) {
  task.classList.toggle("collapsed");
  toggleButton.textContent = task.classList.contains("collapsed")
    ? "Show less"
    : "Show more";
}

function toggleComplete(taskItem, completeButton) {
  taskItem.classList.toggle("done");
  completeButton.textContent = taskItem.classList.contains("done")
    ? "Undo"
    : "Complete";
}

function editTask(task, toggleButton) {
  const newTask = prompt("Edit your task:", task.textContent);

  if (newTask === null || newTask.trim() === "") {
    return;
  }

  task.textContent = newTask.trim();

  resetText(task, toggleButton);
}

function resetText(task, toggleButton) {
  task.classList.add("collapsed");
  toggleButton.textContent = "Show more";
  toggleButton.style.display = "none";

  checkTextLength(task, toggleButton);
}

function checkTextLength(task, toggleButton) {
  requestAnimationFrame(function () {
    if (task.scrollHeight > task.clientHeight) {
      toggleButton.style.display = "block";
    }
  });
}

function deleteTask(taskItem) {
  taskItem.remove();
}
