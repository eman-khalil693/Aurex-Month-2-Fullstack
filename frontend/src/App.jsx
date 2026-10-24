
import { useState } from "react";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };

    setTasks((previous) => [newTask, ...previous]);
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="welcome">
          <p className="eyebrow">AUREX INTERNSHIP · MONTH 2</p>
          <h2>Manage your tasks</h2>
          <p>Organize your work, one task at a time.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Active Tasks</span>
            <strong>
              {tasks.filter((task) => !task.completed).length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>
              {tasks.filter((task) => task.completed).length}
            </strong>
          </div>
        </section>

        <section className="panel">
          <h3>Add a New Task</h3>
          <TaskForm onAdd={addTask} />
        </section>

        <section className="panel">
          <div className="list-heading">
            <h3>My Tasks</h3>
            <span>{filteredTasks.length} tasks</span>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search tasks"
          />

          <div className="filters">
            {["all", "active", "completed"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </main>

      <footer>
        Aurex Full-Stack Engineering Internship · Month 2
      </footer>
    </div>
  );
}
