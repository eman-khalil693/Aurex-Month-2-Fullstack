
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={task.completed ? "task-item completed" : "task-item"}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as completed`}
      />

      <span className="task-title">{task.title}</span>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </div>
  );
}
