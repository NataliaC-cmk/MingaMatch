// src/routes/teacher.routes.js

const express = require('express');
const router = express.Router();

const {
    getTeacherProfile,
    updateTeacherProfile,
    uploadTeacherFiles,
    updateOnboardingStatus
} = require('../controllers/teacher.controller.js');

const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/upload');

// Obtener el perfil del profesor que ha iniciado sesión
router.get('/my-profile', authMiddleware, getTeacherProfile);

// Obtener el perfil de un profesor específico por su ID
router.get('/:id', authMiddleware, getTeacherProfile);

// Actualizar los datos de texto del perfil
router.put('/profile', authMiddleware, updateTeacherProfile);

// Subir archivos (CV, video, etc.)
router.put('/profile/files', authMiddleware, uploadMiddleware, uploadTeacherFiles);

// Guardar el progreso de los pasos del onboarding
router.put('/profile/onboarding-status', authMiddleware, updateOnboardingStatus);

module.exports = router;