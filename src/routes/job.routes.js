/**
 * ==================================================================
 * jobs.routes.js - Enrutador para Vacantes de Empleo
 * ==================================================================
 *
 * Define todas las rutas de la API para la creación, gestión y
 * visualización de las vacantes, asegurando que los roles correctos
 * accedan a cada funcionalidad.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const {
    createJob,
    getPublicJobs,
    getMyJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobs.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middlewares de Verificación de Rol ---
const checkSchool = (req, res, next) => {
    if (req.user && req.user.role === 'school') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de escuela.' });
};

// --- Definición de Rutas ---

/**
 * @desc    Obtiene una lista pública de todas las vacantes activas.
 * @route   GET /api/jobs/public
 * @access  Public
 */
router.get('/public', getPublicJobs);

/**
 * @desc    Obtiene todas las vacantes publicadas por la escuela autenticada.
 * @route   GET /api/jobs/my
 * @access  Private (School)
 */
router.get('/my', authMiddleware, checkSchool, getMyJobs);

/**
 * @desc    Obtiene los detalles de una vacante específica por su ID.
 * @route   GET /api/jobs/:id
 * @access  Private (Cualquier usuario autenticado)
 */
router.get('/:id', authMiddleware, getJobById);

/**
 * @desc    Una escuela crea una nueva vacante.
 * @route   POST /api/jobs
 * @access  Private (School)
 */
router.post('/', authMiddleware, checkSchool, createJob);

/**
 * @desc    Una escuela actualiza una de sus vacantes existentes.
 * @route   PATCH /api/jobs/:id
 * @access  Private (School)
 */
router.patch('/:id', authMiddleware, checkSchool, updateJob);

/**
 * @desc    Una escuela elimina una de sus vacantes.
 * @route   DELETE /api/jobs/:id
 * @access  Private (School)
 */
router.delete('/:id', authMiddleware, checkSchool, deleteJob);

module.exports = router;

