const Interview = require('../models/Interview');

/**
 * @desc     Obtiene todas las entrevistas para el profesor autenticado.
 * @route    GET /api/interviews/my-interviews
 * @access   Private (Teacher)
 */
exports.getTeacherInterviews = async (req, res) => {
    try {
        // Busca todas las entrevistas donde el campo 'teacher' coincida con el ID del usuario logueado
        const interviews = await Interview.find({ teacher: req.user.id })
            .populate('school', 'profile.schoolName') // Trae el nombre de la escuela
            .populate('job', 'title'); // Trae el título de la vacante

        if (!interviews) {
            return res.status(404).json({ message: 'No se encontraron entrevistas.' });
        }

        res.status(200).json(interviews);

    } catch (error) {
        console.error('Error al obtener entrevistas:', error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

/**
 * @desc     Permite a un profesor responder (aceptar/rechazar) una propuesta.
 * @route    PUT /api/interviews/:id/respond
 * @access   Private (Teacher)
 */
exports.respondToInterview = async (req, res) => {
    const { status } = req.body; // El nuevo estado: 'Aceptada' o 'Rechazada'

    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({ message: 'Entrevista no encontrada.' });
        }

        // Verificación de seguridad: solo el profesor invitado puede responder
        if (interview.teacher.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para responder a esta entrevista.' });
        }

        // Actualizar el estado y guardar
        interview.status = status;
        await interview.save();

        res.status(200).json({ message: `Entrevista ${status.toLowerCase()}.`, interview });

    } catch (error) {
        console.error('Error al responder a la entrevista:', error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};