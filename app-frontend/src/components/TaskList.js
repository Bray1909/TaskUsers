import React, { useState, useEffect } from 'react';
import { getTasksByUserId, deleteTask } from '../services/api';

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasksByUserId(userId);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTasks();
  }, [userId]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert('Tarea eliminada');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea.');
    }
  };

  return (
    <div>
      <h2>Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>{task.title}</p>
            <button onClick={() => handleDelete(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
