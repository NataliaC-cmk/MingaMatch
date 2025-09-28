/**
 * ==================================================================
 * Feedback.js - Modelo de Mongoose para el Feedback
 * ==================================================================
 *
 * Define la estructura para almacenar el feedback que una escuela
 * deja sobre un candidato después de una entrevista. Estos datos son
 * cruciales para el control de calidad y la futura mejora del
 * algoritmo de match.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    // --- Relaciones Clave ---
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    // Enlace a la entrevista específica sobre la que se da el feedback.
    interview: {
        type: Schema.Types.ObjectId,
        ref: 'Interview',
        required: true,
    },

    // --- Contenido del Feedback ---
    rating: {
        type: Number,
        required: true,
        min: 1, // Calificación mínima de 1 estrella
        max: 5  // Calificación máxima de 5 estrellas
    },
    comments: {
        type: String,
        trim: true
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para asegurar que solo se pueda dejar un feedback por entrevista.
feedbackSchema.index({ interview: 1 }, { unique: true });

module.exports = mongoose.model('Feedback', feedbackSchema);