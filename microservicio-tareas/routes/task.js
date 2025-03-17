const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/', async (req, res) => {
    const { userId, title, description } = req.body;
    try {
        const task = new Task({ userId, title, description });
        await task.save();
        res.status(201).json({ message: 'Tarea creada correctamente.', task });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor.', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }
        res.json({ message: 'Tarea actualizada correctamente.', task });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor.', error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }
        res.json({ message: 'Tarea eliminada correctamente.' });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor.', error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor.', error: err.message });
    }
});

module.exports = router;
