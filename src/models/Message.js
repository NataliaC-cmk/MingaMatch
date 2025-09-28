/**
 * ==================================================================
 * Message.js - Modelo de Mongoose para Mensajes Individuales
 * ==================================================================
 *
 * Define la estructura para cada mensaje individual enviado dentro
 * de una conversación.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    // --- Relaciones Clave ---
    // Enlace a la conversación a la que pertenece el mensaje.
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },

    // --- Información del Emisor (Referencia Dinámica) ---
    // ID del usuario que envía el mensaje (puede ser Teacher o School).
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel', // Le dice a Mongoose que mire el campo 'senderModel' para saber a qué colección referirse.
    },
    // El modelo del emisor, para saber si es un 'Teacher' o una 'School'.
    senderModel: {
        type: String,
        required: true,
        enum: ['Teacher', 'School'],
    },

    // --- Contenido del Mensaje ---
    content: {
        type: String,
        required: true,
        trim: true,
    },
    // Campo preparado para futuras expansiones (ej. 'link', 'file').
    contentType: {
        type: String,
        default: 'text',
    },

    // --- Estado de Lectura ---
    isRead: {
        type: Boolean,
        default: false,
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para acelerar la búsqueda de mensajes por conversación.
messageSchema.index({ conversation: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);

