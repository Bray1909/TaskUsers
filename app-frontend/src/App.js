// src/App.js
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasksByUserId } from './services/api'; // Asegúrate de que esta función esté en api.js

const App = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);  // Estado para almacenar las tareas

  // Obtener tareas del servidor
  const fetchTasks = async () => {
    if (!userId) return;
    try {
      const response = await getTasksByUserId(userId);
      setTasks(response.data.tasks);  // Actualiza el estado con las tareas más recientes
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Llama a fetchTasks cuando se establece el userId
  }, [userId]);

  const handleLoginSuccess = () => {
    setUserId('67d79c071e933516b5a59c46'); // Establecer ID del usuario después de iniciar sesión
  };

  const handleRegisterSuccess = () => {
    setUserId(null); // Reiniciar el estado después del registro
  };

  const handleSaveTask = () => {
    fetchTasks(); // Actualiza la lista de tareas cada vez que se guarda una tarea
  };

  return (
    <div>
      {!userId ? (
        <>
          <Register onRegisterSuccess={handleRegisterSuccess} />
          <Login onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        <>
          <TaskList tasks={tasks} userId={userId} />
          <TaskForm userId={userId} onSave={handleSaveTask} />
        </>
      )}
    </div>
  );
};

export default App;
