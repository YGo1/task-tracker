import { useState } from 'react';

const EMPTY = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: ''
};

export default function TaskForm({ onSubmit, initial = EMPTY, onCancel }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.length > 100) e.title = 'Max 100 characters';
    if (form.dueDate && new Date(form.dueDate) < new Date())
      e.dueDate = 'Due date cannot be in the past';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          placeholder="Task title *"
          value={form.title}
          onChange={set('title')}
          className="form-input"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={set('description')}
          className="form-input"
        />
      </div>

      <div className="form-row">
        <select value={form.status} onChange={set('status')} className="form-input">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={form.priority} onChange={set('priority')} className="form-input">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="date"
          value={form.dueDate}
          onChange={set('dueDate')}
          className="form-input"
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">Save task</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}