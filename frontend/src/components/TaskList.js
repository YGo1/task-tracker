import { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('createdAt');

  const visible = tasks
    .filter(t => filter === 'all' || t.status === filter)
    .sort((a, b) => new Date(b[sort]) - new Date(a[sort]));

  return (
    <div className="task-list">
      <div className="filters">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="form-input"
        >
          <option value="all">All tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="form-input"
        >
          <option value="createdAt">Sort by date</option>
          <option value="dueDate">Sort by due date</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="no-tasks">No tasks found. Create one above!</p>
      ) : (
        visible.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}