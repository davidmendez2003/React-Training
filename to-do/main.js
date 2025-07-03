document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addButton");
  const section = document.getElementById("listArea");

  const savedTasks = JSON.parse(localStorage.getItem("to-do")) || [];
  savedTasks.forEach(task => {
    displayTasks(task);
  });

  button.addEventListener("click", () => {
    const taskText = "New Task Added"; 
    displayTasks(taskText);
    saveTask(taskText);
  });

  function displayTasks(taskText) {
    const taskDiv = document.createElement("div");
    const wrapper = document.createElement("div");
    wrapper.className = "relative w-full mb-3";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "w-full px-4 py-2 pr-10 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500";
    input.value = taskText;
    let originalText = taskText;

function handleTaskInputs() {
  const newText = input.value.trim();
  if (newText !== originalText) {
    updateTask(originalText, newText);
    originalText = newText;
  }
}
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleTaskInputs();
    input.blur();
  }});
input.addEventListener("blur", handleTaskInputs);

    const dltBtn = document.createElement("button");
    dltBtn.className = "absolute top-[7.5px] right-3";
    const icon = document.createElement("img");
    icon.src = "delete.png"; 
    icon.className = "w-6 h-6";
    dltBtn.addEventListener("click", () => {
      taskDiv.remove();
      deleteTask(taskText);
    });

    dltBtn.appendChild(icon);
    wrapper.appendChild(input);
    wrapper.appendChild(dltBtn);
    taskDiv.appendChild(wrapper);
    section.appendChild(taskDiv);
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("to-do")) || [];
    tasks.push(task);
    localStorage.setItem("to-do", JSON.stringify(tasks));
  }

  function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem("to-do")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("to-do", JSON.stringify(tasks));
  }

  function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("to-do")) || [];
    const index = tasks.indexOf(oldText);
    if (index !== -1) {
      tasks[index] = newText;
      localStorage.setItem("to-do", JSON.stringify(tasks));
    }
  }
});
