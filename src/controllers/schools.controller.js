/**
 * ==================================================================
 * schools.controller.js - Controlador para Perfiles de Escuelas
 * ==================================================================
 *
 * Maneja la lógica de negocio para la actualización y visualización
 * de los perfiles de las escuelas.
 */

const School = require('../models/School');

/**
 * @desc    Una escuela actualiza su propio perfil.
 * @route   PATCH /api/schools/my-profile
 * @access  Private (School)
 */
exports.updateMySchoolProfile = async (req, res) => {
    try {
        const schoolId = req.user.id;

        // El body de la petición debe contener el objeto 'profile' con los campos a actualizar.
        const { profile } = req.body;

        const updatedSchool = await School.findByIdAndUpdate(
            schoolId,
            { $set: { profile: profile } }, // Usamos $set para actualizar solo el sub-documento del perfil
            { new: true, runValidators: true }
        ).select('-password'); // No devolver la contraseña

        if (!updatedSchool) {
            return res.status(404).json({ message: 'Escuela no encontrada.' });
        }

        res.status(200).json(updatedSchool);

    } catch (error) {
        console.error("Error al actualizar el perfil de la escuela:", error);
        res.status(500).json({ message: 'Error en el servidor al actualizar el perfil.' });
    }
};

/**
 * @desc    Obtiene el perfil público de una escuela específica por su ID.
 * @route   GET /api/schools/:id
 * @access  Private (Cualquier usuario autenticado)
 */
exports.getSchoolPublicProfileById = async (req, res) => {
    try {
        const school = await School.findById(req.params.id)
            .select('profile jobsPosted createdAt') // Seleccionamos solo la información pública
            .populate('jobsPosted', 'title status'); // Opcional: mostrar las vacantes activas

        if (!school) {
            return res.status(404).json({ message: 'Escuela no encontrada.' });
        }

        res.status(200).json(school);

    } catch (error) {
        console.error("Error al obtener el perfil público de la escuela:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
