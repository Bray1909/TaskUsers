import React, { useState } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ userId, taskId, onSave }) => {
  const [taskData, setTaskData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await updateTask(taskId, taskData);
        alert('Tarea actualizada');
      } else {
        await createTask({ userId, ...taskData });
        alert('Tarea creada');
      }

      if (onSave && typeof onSave === 'function') {
        onSave(); 
      }
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      alert('Error al guardar la tarea');
    }
  };

  return (
    <div>
      <h2>{taskId ? 'Editar Tarea' : 'Crear Tarea'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={taskData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={taskData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{taskId ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
