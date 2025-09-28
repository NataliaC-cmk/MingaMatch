// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();

const {
    registerTeacher,
    registerSchool,
    login,
    getMe
} = require('../controllers/auth.controller.js'); // Esta ruta es correcta

// --- RUTA CORREGIDA ---
// Solo subimos un nivel para llegar a 'src' y luego bajamos a 'middleware'
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register-teacher', registerTeacher);
router.post('/register-school', registerSchool);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;