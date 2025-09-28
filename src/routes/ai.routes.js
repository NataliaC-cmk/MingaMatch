/**
 * ==================================================================
 * ai.routes.js - Enrutador para las Rutas de Inteligencia Artificial
 * ==================================================================
 *
 * Define la ruta de la API para el análisis de candidatos con IA,
 * asegurando que solo los usuarios autorizados (escuelas y admins)
 * puedan acceder.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const { analyzeCandidate } = require('../controllers/ai.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middleware de Verificación de Rol ---
// Este middleware se asegura de que solo las escuelas o administradores puedan pasar.
const checkSchoolOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'school' || req.user.role === 'admin')) {
        next(); // El usuario tiene un rol permitido, continuar.
    } else {
        // Si no tiene el rol adecuado, denegar el acceso.
        res.status(403).json({ message: 'Acceso denegado. Se requiere rol de escuela o administrador.' });
    }
};

// --- Definición de Ruta ---

/**
 * @desc    Analiza un candidato para una vacante usando IA.
 * @route   POST /api/ai/analyze-candidate
 * @access  Private (School, Admin)
 */
router.post('/analyze-candidate', authMiddleware, checkSchoolOrAdmin, analyzeCandidate);

module.exports = router;