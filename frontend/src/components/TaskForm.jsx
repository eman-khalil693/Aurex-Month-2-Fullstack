
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a new task..."
        aria-label="New task"
        maxLength={150}
        required
      />

      <button className="primary-button" type="submit">
        + Add Task
      </button>
    </form>
  );
}
