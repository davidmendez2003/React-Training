document.addEventListener("DOMContentLoaded", ()=>{
  const button = document.getElementById("addButton");

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    displayTasks(task);
  });

  button.addEventListener("click",()=>{
    const taskText = "New Task Added";
    const task = {
      id: `task-${Date.now()}`,
      text: taskText,
      column: "firstBox"
    };
    displayTasks(task);
    saveTask(task);
  });

  function displayTasks(task) {
    const section = document.getElementById(task.column);
    const wrapper = document.createElement("div");
    wrapper.className = "relative w-[290px] mb-3 rounded";
    wrapper.id = task.id;
    wrapper.draggable = true;
    wrapper.addEventListener("dragstart", (e)=>{
      e.dataTransfer.setData("text/plain", wrapper.id);
    });

    const input = document.createElement("input");
    input.type = "text";
    input.className = "w-full px-4 py-2 pr-10 rounded rounded-2xl border border-2 border-purple";
    input.value = task.text;
    let originalText = input.value;


function handleTaskInputs() {
  const newText = input.value.trim();
  if (newText !== originalText) {
    updateTask(task.id, newText);
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
    icon.className = "w-6 h-6 hover:cursor-pointer";
    dltBtn.addEventListener("click", () => {
      wrapper.remove();
      deleteTask(task.id);
    });

    dltBtn.appendChild(icon);
    wrapper.appendChild(input);
    wrapper.appendChild(dltBtn);
    section.appendChild(wrapper);
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateTask(id, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.text = newText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

    function deleteTask(id) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

function allowDrop(e) {
  e.preventDefault();
}

function drop(event, targetId) {
  event.preventDefault();
  const draggedId = event.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(draggedId);
  const target = document.getElementById(targetId);
  if (draggedEl && target) {
    target.appendChild(draggedEl);
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === draggedId);
    if (task) {
      task.column = targetId;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}
