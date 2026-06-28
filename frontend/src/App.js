import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      toast.success('Task created!');
      setShowForm(false);
    } catch (e) {
      toast.error('Could not create task');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTask(id, data);
      toast.success('Task updated!');
    } catch (e) {
      toast.error('Could not update task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      toast.success('Task deleted!');
    } catch (e) {
      toast.error('Could not delete task');
    }
  };

  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={2500} />

      <header className="app-header">
        <h1>Task Tracker</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
