/**
 * ==================================================================
 * feedback.controller.js - Controlador para la Lógica de Feedback
 * ==================================================================
 *
 * Maneja la lógica de negocio para que las escuelas puedan enviar
 * feedback sobre un candidato después de una entrevista.
 */

const Feedback = require('../models/Feedback');
const Interview = require('../models/Interview');

/**
 * @desc    Una escuela deja feedback después de una entrevista.
 * @route   POST /api/feedback
 * @access  Private (School)
 */
exports.submitFeedback = async (req, res) => {
    try {
        const { interviewId, rating, comments } = req.body;
        const schoolId = req.user.id;

        if (!interviewId || !rating) {
            return res.status(400).json({ message: 'El ID de la entrevista y la calificación son obligatorios.' });
        }

        // 1. Validar que la entrevista exista y pertenezca a la escuela que está autenticada.
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({ message: 'La entrevista especificada no fue encontrada.' });
        }

        if (interview.school.toString() !== schoolId) {
            return res.status(403).json({ message: 'No tienes permiso para dejar feedback sobre esta entrevista.' });
        }

        // 2. Verificar que el estado de la entrevista sea 'Realizada'.
        if (interview.status !== 'Realizada') {
            return res.status(400).json({ message: 'Solo se puede dejar feedback para entrevistas que ya han sido marcadas como realizadas.' });
        }

        // 3. Crear y guardar el nuevo feedback.
        const newFeedback = new Feedback({
            school: schoolId,
            teacher: interview.teacher,
            job: interview.job,
            interview: interviewId,
            rating,
            comments
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback enviado con éxito.', feedback: newFeedback });

    } catch (error) {
        // Manejar error de feedback duplicado (código 11000 de MongoDB).
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Ya se ha enviado un feedback para esta entrevista.' });
        }
        console.error('Error al enviar feedback:', error);
        res.status(500).json({ message: 'Error en el servidor al procesar el feedback.' });
    }
};