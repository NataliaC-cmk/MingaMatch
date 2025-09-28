/**
 * ==================================================================
 * User.js - Modelo de Mongoose para Usuarios Genéricos
 * ==================================================================
 *
 * NOTA: Este modelo NO se utiliza actualmente para los roles de
 * 'Teacher', 'School' o 'Admin', ya que ellos tienen sus propios
 * modelos detallados. Este archivo se mantiene como una base para
 * futuros roles de usuario genéricos que puedan necesitarse.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        // Actualmente, los roles principales tienen sus propios modelos.
        enum: ['user'], // Preparado para futuros roles simples.
        default: 'user',
    },
}, {
    timestamps: true,
});

// Se podría añadir la lógica de encriptación de contraseña aquí si se va a utilizar.

module.exports = mongoose.model('User', userSchema);