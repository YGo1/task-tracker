import { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleUpdate = async (data) => {
    await onUpdate(task._id, data);
    setEditing(false);
  };

  const priorityColors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const statusColors = {
    pending: '#94a3b8',
    'in-progress': '#3b82f6',
    completed: '#22c55e'
  };

  if (editing) {
    return (
      <div className="task-card">
        <TaskForm
          initial={task}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className="badge" style={{ backgroundColor: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <span className="badge" style={{ backgroundColor: statusColors[task.status] }}>
            {task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="task-due">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="task-actions">
        <button onClick={() => setEditing(true)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}