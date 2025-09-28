/**
 * ==================================================================
 * Interest.js - Modelo de Mongoose para "Favoritos"
 * ==================================================================
 *
 * Este modelo representa el interés de un profesor en una vacante,
 * funcionando como una lista de "Favoritos". Permite a los profesores
 * guardar vacantes para revisarlas o postular a ellas más tarde.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const interestSchema = new Schema({
    // --- Relaciones Clave ---
    // Referencia directa y segura a la vacante guardada.
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    // Referencia directa y segura al profesor que guarda la vacante.
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    // Opcional: guardamos la referencia a la escuela para consultas más rápidas.
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    // Campo para notas personales que el profesor puede añadir.
    note: {
        type: String,
        trim: true,
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para asegurar que un profesor no pueda guardar la misma vacante dos veces.
interestSchema.index({ job: 1, teacher: 1 }, { unique: true });

module.exports = mongoose.model('Interest', interestSchema);