/**
 * ==================================================================
 * interests.routes.js - Enrutador para "Favoritos"
 * ==================================================================
 *
 * Define las rutas de la API para que los profesores puedan guardar
 * vacantes en su lista de favoritos y los administradores puedan
 * supervisar esta actividad.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const { 
    toggleInterest, 
    getMyInterests, 
    getAllInterests 
} = require('../controllers/interests.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middlewares de Verificación de Rol ---
const checkTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de profesor.' });
};

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
};


// --- Definición de Rutas ---

/**
 * @desc    Añade o quita una vacante de la lista de favoritos de un profesor.
 * @route   POST /api/interests/toggle
 * @access  Private (Teacher)
 */
router.post('/toggle', authMiddleware, checkTeacher, toggleInterest);

/**
 * @desc    Obtiene la lista de vacantes favoritas del profesor autenticado.
 * @route   GET /api/interests/my
 * @access  Private (Teacher)
 */
router.get('/my', authMiddleware, checkTeacher, getMyInterests);

/**
 * @desc    Obtiene una lista de todos los intereses guardados (para supervisión).
 * @route   GET /api/interests
 * @access  Private (Admin)
 */
router.get('/', authMiddleware, checkAdmin, getAllInterests);

module.exports = router;
