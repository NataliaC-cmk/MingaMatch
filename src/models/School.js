/**
 * ==================================================================
 * School.js - Modelo de Mongoose para las Escuelas (Corregido)
 * ==================================================================
 *
 * Define la estructura para el perfil de una escuela, que actúa como
 * un usuario empleador en la plataforma.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const schoolSchema = new Schema({
    // --- Credenciales de Autenticación ---
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
    role: { // Añadido para consistencia con los otros modelos
        type: String,
        default: 'school'
    },

    // --- Perfil Detallado de la Escuela ---
    profile: {
        schoolName: { type: String, required: true, trim: true },
        schoolType: { type: String, enum: ['Pública', 'Privada', 'Charter'], trim: true },
        website: { type: String, trim: true },
        description: { type: String, trim: true },
        location: {
            streetAddress: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            zipCode: { type: String, trim: true },
            country: { type: String, trim: true },
        },
        contact: {
            name: { type: String, trim: true },
            role: { type: String, trim: true }, // Ej: 'Director de RRHH', 'Coordinador Académico'
            phone: { type: String, trim: true },
        }
    },

    // --- Gestión de la Cuenta ---
    accountStatus: {
        type: String,
        enum: ['Pendiente', 'Aprobada', 'Rechazada', 'Suspendida'],
        default: 'Aprobada',
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },

    // --- Relaciones con otros Modelos ---
    jobsPosted: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
    }],

}, {
    timestamps: true,
});

// Middleware para encriptar la contraseña antes de guardar.
schoolSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


// --- BLOQUE AÑADIDO (LA SOLUCIÓN) ---
// Método para comparar la contraseña ingresada con la de la base de datos.
schoolSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('School', schoolSchema);