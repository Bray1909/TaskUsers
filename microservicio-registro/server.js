const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

// Configura CORS
app.use(cors()) 

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/user-tasks')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión', err));

// Rutas
app.use('/api/auth', authRoutes);

// Puerto
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
