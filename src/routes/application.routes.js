/**
 * ==================================================================
 * applications.routes.js - Enrutador para Postulaciones
 * ==================================================================
 *
 * Define todas las rutas de la API para el proceso de postulación,
 * asegurando que los roles correctos accedan a cada funcionalidad.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const { 
    applyToJob, 
    getApplicationsForJob, 
    getMyApplications,
    updateApplicationStatus 
} = require('../controllers/applications.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middlewares de Verificación de Rol ---
const checkTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de profesor.' });
};

const checkSchoolOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'school' || req.user.role === 'admin')) return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de escuela o administrador.' });
};

// --- Definición de Rutas ---

/**
 * @desc    Un profesor postula a una vacante.
 * @route   POST /api/applications
 * @access  Private (Teacher)
 */
router.post('/', authMiddleware, checkTeacher, applyToJob);

/**
 * @desc    Obtiene la lista de postulantes para una vacante específica.
 * @route   GET /api/applications/job/:jobId
 * @access  Private (School, Admin)
 */
router.get('/job/:jobId', authMiddleware, checkSchoolOrAdmin, getApplicationsForJob);

/**
 * @desc    Actualiza el estado de una postulación.
 * @route   PATCH /api/applications/:applicationId/status
 * @access  Private (School, Admin)
 */
router.patch('/:applicationId/status', authMiddleware, checkSchoolOrAdmin, updateApplicationStatus);

/**
 * @desc    Un profesor obtiene su historial de postulaciones.
 * @route   GET /api/applications/my
 * @access  Private (Teacher)
 */
router.get('/my', authMiddleware, checkTeacher, getMyApplications);

module.exports = router;