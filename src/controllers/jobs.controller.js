/**
 * ==================================================================
 * jobs.controller.js - Controlador para Vacantes de Empleo
 * ==================================================================
 *
 * Maneja toda la lógica de negocio para la creación, gestión y
 * visualización de las vacantes de empleo publicadas por las escuelas.
 */

const Job = require('../models/Job');
const School = require('../models/School');

/**
 * @desc    Crea una nueva vacante de empleo.
 * @route   POST /api/jobs
 * @access  Private (School)
 */
exports.createJob = async (req, res) => {
    try {
        const schoolId = req.user.id;
        
        // Añadimos la referencia a la escuela en los datos de la vacante.
        const jobData = { ...req.body, school: schoolId };

        const newJob = await Job.create(jobData);

        // Actualizamos el documento de la escuela para añadir la nueva vacante a su lista.
        await School.findByIdAndUpdate(schoolId, { $push: { jobsPosted: newJob._id } });

        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error al crear la vacante:", error);
        res.status(500).json({ message: 'Error en el servidor al crear la vacante.' });
    }
};

/**
 * @desc    Obtiene una lista pública de todas las vacantes activas con paginación.
 * @route   GET /api/jobs/public
 * @access  Public
 */
exports.getPublicJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const jobs = await Job.find({ status: 'Activa', isPublic: true })
            .populate('school', 'profile.schoolName profile.location.state')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-school.email -school.password') // No exponer datos sensibles
            .lean();
        
        const totalJobs = await Job.countDocuments({ status: 'Activa', isPublic: true });

        res.status(200).json({
            jobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            totalJobs
        });
    } catch (error) {
        console.error("Error al obtener vacantes públicas:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Obtiene todas las vacantes publicadas por la escuela autenticada.
 * @route   GET /api/jobs/my
 * @access  Private (School)
 */
exports.getMyJobs = async (req, res) => {
    try {
        const schoolId = req.user.id;
        const jobs = await Job.find({ school: schoolId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error al obtener mis vacantes:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Obtiene los detalles de una vacante específica por su ID.
 * @route   GET /api/jobs/:id
 * @access  Private
 */
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('school', 'profile.schoolName');
        if (!job) {
            return res.status(404).json({ message: 'Vacante no encontrada.' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error al obtener la vacante:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Actualiza una vacante existente.
 * @route   PATCH /api/jobs/:id
 * @access  Private (School)
 */
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Vacante no encontrada.' });
        }

        // ¡Control de Seguridad!
        if (job.school.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para editar esta vacante.' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error("Error al actualizar la vacante:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Elimina una vacante.
 * @route   DELETE /api/jobs/:id
 * @access  Private (School)
 */
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Vacante no encontrada.' });
        }

        // ¡Control de Seguridad!
        if (job.school.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta vacante.' });
        }

        await Job.findByIdAndDelete(req.params.id);

        // Limpiar la referencia en el documento de la escuela.
        await School.findByIdAndUpdate(job.school, { $pull: { jobsPosted: job._id } });

        res.status(200).json({ message: 'Vacante eliminada con éxito.' });
    } catch (error) {
        console.error("Error al eliminar la vacante:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};