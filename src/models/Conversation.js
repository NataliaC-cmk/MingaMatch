/**
 * ==================================================================
 * Conversation.js - Modelo de Mongoose para Conversaciones
 * ==================================================================
 *
 * Define la estructura para una conversación entre una Escuela y un
 * Profesor, siempre en el contexto de una Vacante específica.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
    // --- Participantes Específicos ---
    // Guardamos las referencias directas a los modelos Teacher y School.
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },

    // --- Contexto de la Conversación ---
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },

    // --- Información del Último Mensaje (para eficiencia) ---
    lastMessageAt: {
        type: Date,
        default: Date.now,
    },
    // Almacenamos un fragmento del último mensaje para mostrar en la lista
    // de conversaciones sin necesidad de hacer una consulta extra.
    lastMessageSnippet: {
        type: String,
        trim: true,
        default: 'Conversación iniciada.',
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para asegurar que no se creen conversaciones duplicadas para
// el mismo profesor, la misma escuela y la misma vacante.
conversationSchema.index({ teacher: 1, school: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Conversation', conversationSchema);

