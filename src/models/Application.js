/**
 * ==================================================================
 * Application.js - Modelo de Mongoose para Postulaciones
 * ==================================================================
 *
 * Define la estructura para cada postulación que un profesor realiza
 * a una vacante de una escuela. Este es un modelo central que conecta
 * a los tres actores principales y registra el estado del proceso.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    // --- Relaciones Clave ---
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true, // Esencial para la integridad y eficiencia de las consultas.
    },

    // --- Estado del Proceso de Selección ---
    status: {
        type: String,
        required: true,
        // Estandarizado en español para consistencia con el frontend.
        enum: [
            'Postulado',
            'En Revisión',
            'Entrevistando',
            'Oferta Extendida',
            'Contratado',
            'Rechazado',
        ],
        default: 'Postulado',
    },

    // --- Enlaces a Pasos Posteriores del Proceso ---
    interview: {
        type: Schema.Types.ObjectId,
        ref: 'Interview',
        default: null, // Se asignará cuando se cree una entrevista para esta postulación.
    },
    feedback: {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
        default: null, // Se asignará cuando se deje feedback para esta postulación.
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para asegurar que un profesor no pueda postular dos veces al mismo trabajo.
applicationSchema.index({ job: 1, teacher: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

