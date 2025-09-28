const express = require('express');
const router = express.Router();
const { getResources, createResource, deleteResource } = require('../controllers/resource.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
};

// Ruta para que todos los usuarios autenticados obtengan los recursos
router.get('/', authMiddleware, getResources);
// Rutas solo para administradores
router.post('/', authMiddleware, checkAdmin, createResource);
router.delete('/:id', authMiddleware, checkAdmin, deleteResource);

module.exports = router;