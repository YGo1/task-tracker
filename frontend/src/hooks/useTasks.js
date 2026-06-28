import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function useTasks(filters = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/tasks`, { params: filters });
      setTasks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    const { data } = await axios.post(`${API}/tasks`, taskData);
    setTasks(prev => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await axios.put(`${API}/tasks/${id}`, taskData);
    setTasks(prev => prev.map(t => t._id === id ? data : t));
    return data;
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks };
}