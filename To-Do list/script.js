let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let dueDate = document.getElementById("dueDate");
let taskList = document.getElementById("taskList");
let themeToggle = document.getElementById("themeToggle");
let filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks
    .filter(task => {
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .forEach((task, index) => {
      let li = document.createElement("li");

      let taskText = document.createElement("span");
      taskText.textContent = `${task.text} (Due: ${task.date || "No date"})`;
      if (task.completed) taskText.classList.add("completed");

      taskText.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks(filter);
      });

      let delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
      });

      li.appendChild(taskText);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  let text = taskInput.value.trim();
  let date = dueDate.value;
  if (text === "") return;

  tasks.push({ text, date, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  dueDate.value = "";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    renderTasks(btn.dataset.filter);
  });
});

renderTasks();

