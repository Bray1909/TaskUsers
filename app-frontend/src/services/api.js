
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const TASK_API_URL = 'http://localhost:5001/api/tasks';


export const registerUser = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};


export const createTask = (taskData) => {
    return axios.post(TASK_API_URL, taskData);
};

export const updateTask = (taskId, taskData) => {
    return axios.put(`${TASK_API_URL}/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
    return axios.delete(`${TASK_API_URL}/${taskId}`);
};

export const getTasksByUserId = (userId) => {
    return axios.get(`${TASK_API_URL}/${userId}`);
};
