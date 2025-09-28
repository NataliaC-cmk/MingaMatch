/**
 * ==================================================================
 * interests.controller.js - Controlador para "Favoritos"
 * ==================================================================
 *
 * Maneja la lógica para que los profesores puedan guardar vacantes
 * en su lista de favoritos para revisarlas o postular más tarde.
 */

const Interest = require('../models/Interest');
const Job = require('../models/Job');

/**
 * @desc    Añade o quita una vacante de la lista de favoritos de un profesor.
 * @route   POST /api/interests/toggle
 * @access  Private (Teacher)
 */
exports.toggleInterest = async (req, res) => {
    try {
        const { jobId } = req.body;
        const teacherId = req.user.id;

        if (!jobId) {
            return res.status(400).json({ message: 'El ID de la vacante es obligatorio.' });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Vacante no encontrada.' });
        }

        // Buscar si ya existe un "interés" (favorito) para este profesor y esta vacante.
        const existingInterest = await Interest.findOne({ job: jobId, teacher: teacherId });

        if (existingInterest) {
            // Si ya existe, lo eliminamos (función de "quitar de favoritos").
            await Interest.findByIdAndDelete(existingInterest._id);
            return res.status(200).json({ message: 'Vacante eliminada de tus favoritos.', isFavorited: false });
        } else {
            // Si no existe, lo creamos (función de "añadir a favoritos").
            const newInterest = new Interest({
                job: jobId,
                teacher: teacherId,
                school: job.school, // Guardamos la escuela para consistencia
            });
            await newInterest.save();
            return res.status(201).json({ message: 'Vacante guardada en tus favoritos.', isFavorited: true, interest: newInterest });
        }

    } catch (error) {
        console.error('Error en toggleInterest:', error);
        res.status(500).json({ message: 'Error en el servidor al gestionar favoritos.' });
    }
};

/**
 * @desc    Obtiene la lista de vacantes favoritas de un profesor.
 * @route   GET /api/interests/my
 * @access  Private (Teacher)
 */
exports.getMyInterests = async (req, res) => {
    try {
        const teacherId = req.user.id;

        const interests = await Interest.find({ teacher: teacherId })
            .populate({
                path: 'job',
                select: 'title description location requirements',
                populate: {
                    path: 'school',
                    select: 'profile.schoolName'
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json(interests);

    } catch (error) {
        console.error('Error al obtener mis intereses:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener favoritos.' });
    }
};

/**
 * @desc    Obtiene una lista de todos los intereses (para administradores).
 * @route   GET /api/interests
 * @access  Private (Admin)
 */
exports.getAllInterests = async (req, res) => {
    try {
        const interests = await Interest.find()
            .populate('teacher', 'profile.fullName email')
            .populate('job', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json(interests);
    } catch (error) {
        console.error('Error al obtener todos los intereses:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
