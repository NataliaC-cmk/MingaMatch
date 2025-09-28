// src/controllers/teacher.controller.js

const Teacher = require('../models/Teacher');

/**
 * @desc     Obtiene el perfil de un profesor.
 * @route    GET /api/teachers/my-profile o /api/teachers/:id
 * @access   Private
 */
exports.getTeacherProfile = async (req, res) => {
    try {
        const teacherId = req.params.id || req.user.id;
        const teacher = await Teacher.findById(teacherId).select('-password');
        if (!teacher) {
            return res.status(404).json({ message: 'Profesor no encontrado.' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

/**
 * @desc     Actualiza el perfil completo del profesor.
 * @route    PUT /api/teachers/profile
 * @access   Private
 */
exports.updateTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Profesor no encontrado.' });
        }

        // Fusiona los datos del perfil existentes con los nuevos que llegan
        // Esto permite actualizaciones parciales o completas.
        Object.assign(teacher.profile, req.body.profile);
        
        const updatedTeacher = await teacher.save();
        res.status(200).json(updatedTeacher.profile);
    } catch (error) {
        console.error('Error al actualizar perfil de profesor:', error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};


/**
 * @desc     Sube y actualiza los archivos del perfil del profesor.
 * @route    PUT /api/teachers/profile/files
 * @access   Private
 */
exports.uploadTeacherFiles = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Profesor no encontrado.' });
        }

        const files = req.files || {};
        if (files.cv) teacher.profile.cvUrl = `/uploads/${files.cv[0].filename}`;
        if (files.profilePicture) teacher.profile.profilePictureUrl = `/uploads/${files.profilePicture[0].filename}`;
        if (files.presentationVideo) teacher.profile.presentationVideoUrl = `/uploads/${files.presentationVideo[0].filename}`;
        if (files.credentialPdf) teacher.profile.credentialPdfUrl = `/uploads/${files.credentialPdf[0].filename}`;
        
        await teacher.save();
        
        res.status(200).json({
            message: 'Archivos subidos correctamente.',
            profile: teacher.profile
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor al subir archivos.' });
    }
};

/**
 * @desc     Actualiza el estado de un paso del onboarding del profesor.
 * @route    PUT /api/teachers/profile/onboarding-status
 * @access   Private
 */
exports.updateOnboardingStatus = async (req, res) => {
    const { step } = req.body;
    const validSteps = ['agreementAccepted', 'documentsPrepared', 'filesUploaded', 'personalInfoComplete'];
    if (!validSteps.includes(step)) {
        return res.status(400).json({ message: 'Paso inválido.' });
    }
    try {
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Profesor no encontrado.' });
        }
        teacher.profile.onboardingStatus[step] = true;
        await teacher.save();
        res.status(200).json({
            message: `Paso '${step}' completado.`,
            onboardingStatus: teacher.profile.onboardingStatus
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor.' });
    }
};