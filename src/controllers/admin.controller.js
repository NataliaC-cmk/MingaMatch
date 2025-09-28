/**
 * ==================================================================
 * admin.controller.js - Controlador de Admin (Versión Mejorada y Final)
 * ==================================================================
 *
 * Mejoras clave:
 * - Se unifica la búsqueda para que un solo término filtre por nombre y correo.
 * - Se envían datos adicionales (ID, edad, experiencia) para el dashboard.
 * - Código optimizado para mayor claridad y mantenimiento.
 */

const Teacher = require('../models/Teacher');
const School = require('../models/School');
const Job = require('../models/Job');
const Application = require('../models/Application');

/**
 * @desc     Obtiene las estadísticas clave para el dashboard.
 * @route    GET /api/admin/stats
 * @access   Private (Admin)
 */
exports.getAdminStats = async (req, res) => {
    try {
        const [teacherCount, schoolCount, activeJobsCount, totalApplicationsCount] = await Promise.all([
            Teacher.countDocuments(),
            School.countDocuments(),
            Job.countDocuments({ status: 'Activa' }),
            Application.countDocuments()
        ]);

        res.status(200).json({
            teachers: teacherCount,
            schools: schoolCount,
            activeJobs: activeJobsCount,
            totalApplications: totalApplicationsCount,
        });
    } catch (error) {
        console.error('Error al obtener estadísticas de admin:', error);
        res.status(500).json({ message: 'Error del servidor al obtener las estadísticas.' });
    }
};

/**
 * @desc     Obtiene la lista de profesores con filtro y datos para tooltip.
 * @route    GET /api/admin/teachers
 * @access   Private (Admin)
 */
exports.getAllTeachers = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            const regex = new RegExp(search, 'i');
            query.$or = [
                { 'profile.fullName': regex },
                { fullName: regex },
                { email: regex }
            ];
        }

        const teachersData = await Teacher.find(query)
            .select('_id profile.fullName fullName email createdAt profile.birthDate profile.totalExperience profile.subjects')
            .sort({ createdAt: -1 })
            .lean(); // .lean() para procesar los objetos más rápido

        // Añadimos la edad calculada a cada profesor
        const teachers = teachersData.map(teacher => {
            let age = 'N/A';
            if (teacher.profile?.birthDate) {
                const birthDate = new Date(teacher.profile.birthDate);
                const today = new Date();
                let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    calculatedAge--;
                }
                age = calculatedAge;
            }
            // Devolvemos el objeto del profesor con la nueva propiedad 'age'
            return { ...teacher, age };
        });
            
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: 'Error del servidor al obtener los profesores.' });
    }
};

/**
 * @desc     Obtiene la lista de escuelas con filtro de búsqueda unificado.
 * @route    GET /api/admin/schools
 * @access   Private (Admin)
 */
exports.getAllSchools = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            const regex = new RegExp(search, 'i');
            query.$or = [
                { 'profile.schoolName': regex },
                { schoolName: regex },
                { email: regex }
            ];
        }

        const schools = await School.find(query)
            .select('_id profile.schoolName schoolName email accountStatus createdAt') // Se añade _id
            .sort({ createdAt: -1 });

        res.status(200).json(schools);
    } catch (error) {
        console.error('Error al obtener escuelas:', error);
        res.status(500).json({ message: 'Error del servidor al obtener las escuelas.' });
    }
};

/**
 * @desc     Obtiene una lista de todas las vacantes activas.
 * @route    GET /api/admin/active-jobs
 * @access   Private (Admin)
 */
exports.getActiveJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'Activa' })
            .populate('school', 'profile.schoolName schoolName')
            .sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error al obtener vacantes activas:', error);
        res.status(500).json({ message: 'Error del servidor al obtener vacantes activas.' });
    }
};

/**
 * @desc     Obtiene una lista de todas las postulaciones.
 * @route    GET /api/admin/applications
 * @access   Private (Admin)
 */
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('teacher', 'profile.fullName fullName')
            .populate('school', 'profile.schoolName schoolName')
            .populate('job', 'title')
            .sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error al obtener postulaciones:', error);
        res.status(500).json({ message: 'Error del servidor al obtener postulaciones.' });
    }
};