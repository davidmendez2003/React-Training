import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const columns = ["To-Do", "In-Progress", "Completed"];

  const addTask = () => {
  const newTask = {
    id: `task${Date.now()}`,
    text: "New Task Added",
    column: "To-Do",
    };
    setTasks(tasks => [...tasks, newTask]);
  };

  const updateTaskText = (id, newText) => {
    setTasks(tasks =>tasks.map(task => (task.id === id ? {...task, text: newText } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };
  
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const onDrop = (e, column) => {
    const draggedId = e.dataTransfer.getData("text/plain");
    setTasks(tasks =>tasks.map(task =>task.id === draggedId ? {...task, column } : task)
    );
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Kanban Board</h1>

      <div className="flex justify-center mb-6">
        <button onClick={addTask} className="px-6 rounded py-2 bg-purple-600 text-white hover:bg-purple-700">Add Task</button>
      </div>

      <div className="flex justify-around gap-6 px-4">
        {columns.map((col) => (
          <div onDrop={(e) => onDrop(e, col)} onDragOver={allowDrop} className="w-[300px] min-h-[400px] p-4 bg-white rounded-xl border-2 border-purple-300">
            <h2 className="mb-4 font-semibold text-center text-purple-700 uppercase"> {col}</h2>

            {tasks.filter(task => task.column === col).map(task => (
             <div className="relative w-full mb-3 p-2 bg-purple-100 rounded-3xl border border-purple-400" draggable onDragStart={(e) => onDragStart(e, task.id)}>
                  <input type="text" value={task.text} onChange={(e) =>updateTaskText(task.id, e.target.value)}
                    onBlur={(e) =>updateTaskText(task.id, e.target.value.trim())}
                    onKeyDown={(e) => {if (e.key === "Enter") { e.target.blur();}}}
                    className="w-full py-2  px-4 pr-10 border border-purple-300 rounded-2xl"/>
                  <button onClick={() => deleteTask(task.id)} className="absolute top-[18px] right-3">
                    <img src="delete.svg" className="w-6 h-6"/>
                  </button>
             </div>
            ))}
         </div>
        ))}
      </div>
    </div>
  );
}
export default App;
