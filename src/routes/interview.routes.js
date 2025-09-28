// src/routes/interview.routes.js

const express = require('express');
const router = express.Router();

const {
    getTeacherInterviews,
    respondToInterview
} = require('../controllers/interview.controller');

const authMiddleware = require('../middleware/authMiddleware');

// --- Rutas Protegidas para Profesores ---

// Ruta para que un profesor obtenga su lista de entrevistas
router.get('/my-interviews', authMiddleware, getTeacherInterviews);

// Ruta para que un profesor responda a una entrevista específica
router.put('/:id/respond', authMiddleware, respondToInterview);


module.exports = router;
