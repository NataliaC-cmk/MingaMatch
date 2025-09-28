// src/routes/admin.routes.js

const express = require('express');
const router = express.Router();

const {
    getAdminStats,
    getAllTeachers,
    getAllSchools,
    // ...otras funciones si las tienes
} = require('../controllers/admin.controller.js'); // Esta ruta es correcta

// --- RUTA CORREGIDA ---
const authMiddleware = require('../middleware/authMiddleware');

// Middleware para verificar que solo los admins accedan a estas rutas
const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
};

// Aplicamos los middlewares a todas las rutas de admin
router.use(authMiddleware, checkAdmin);

router.get('/stats', getAdminStats);
router.get('/teachers', getAllTeachers);
router.get('/schools', getAllSchools);

module.exports = router;