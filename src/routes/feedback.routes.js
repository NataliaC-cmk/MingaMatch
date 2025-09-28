/**
 * ==================================================================
 * feedback.routes.js - Enrutador para las Rutas de Feedback
 * ==================================================================
 *
 * Define la ruta de la API para que las escuelas puedan enviar su
 * feedback después de una entrevista, asegurando que solo los
 * roles autorizados puedan acceder.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const { submitFeedback } = require('../controllers/feedback.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middleware de Verificación de Rol ---
// Este middleware se asegura de que solo las escuelas o administradores puedan pasar.
const checkSchoolOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'school' || req.user.role === 'admin')) {
        next(); // El usuario tiene un rol permitido, continuar.
    } else {
        res.status(403).json({ message: 'Acceso denegado. Se requiere rol de escuela o administrador.' });
    }
};

// --- Definición de Ruta ---

/**
 * @desc    Una escuela envía feedback para una entrevista.
 * @route   POST /api/feedback
 * @access  Private (School, Admin)
 */
router.post('/', authMiddleware, checkSchoolOrAdmin, submitFeedback);

module.exports = router;