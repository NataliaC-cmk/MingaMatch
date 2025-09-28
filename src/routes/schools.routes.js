/**
 * ==================================================================
 * schools.routes.js - Enrutador para Perfiles de Escuelas
 * ==================================================================
 *
 * Define las rutas de la API para la actualización y visualización
 * de los perfiles de las escuelas.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const {
    updateMySchoolProfile,
    getSchoolPublicProfileById
} = require('../controllers/schools.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Middlewares de Verificación de Rol ---
const checkSchool = (req, res, next) => {
    if (req.user && req.user.role === 'school') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de escuela.' });
};

// --- Definición de Rutas ---

/**
 * @desc    Una escuela actualiza su propio perfil.
 * @route   PATCH /api/schools/my-profile
 * @access  Private (School)
 */
router.patch('/my-profile', authMiddleware, checkSchool, updateMySchoolProfile);

/**
 * @desc    Obtiene el perfil público de una escuela específica por su ID.
 * @route   GET /api/schools/:id
 * @access  Private (Cualquier usuario autenticado)
 */
router.get('/:id', authMiddleware, getSchoolPublicProfileById);

module.exports = router;