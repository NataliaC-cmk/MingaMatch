// src/models/Interview.js

const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    // Referencia al profesor que es entrevistado
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    // Referencia a la escuela que propone la entrevista
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    // Referencia a la vacante de trabajo específica
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Asegúrate de tener un modelo 'Job'
        required: true
    },
    // Fecha y hora propuestas por la escuela
    proposedDate: {
        type: Date,
        required: true
    },
    // Mensaje opcional de la escuela al profesor
    message: {
        type: String,
        trim: true
    },
    // Estado actual de la propuesta de entrevista
    status: {
        type: String,
        enum: ['Propuesta', 'Aceptada', 'Rechazada', 'Cancelada'],
        default: 'Propuesta'
    }
}, {
    // Agrega automáticamente los campos createdAt y updatedAt
    timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);