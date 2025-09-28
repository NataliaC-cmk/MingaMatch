/**
 * ==================================================================
 * Job.js - Modelo de Mongoose para las Vacantes de Empleo
 * ==================================================================
 *
 * Define la estructura para cada vacante de empleo publicada por una
 * escuela. Este modelo contiene toda la información necesaria para
 * que los profesores puedan buscar y postular, y para que nuestro
 * sistema de IA pueda realizar el análisis de idoneidad.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    // --- Relación Clave ---
    // Enlace obligatorio a la escuela que publica la vacante.
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },

    // --- Información Básica de la Vacante ---
    title: {
        type: String,
        required: true,
        trim: true,
        default: function() {
            // Genera un título por defecto si no se proporciona.
            return `${this.requirements.specialty} Teacher - ${this.requirements.level}`;
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
    },
    zone: {
        type: String,
        enum: ['Urbana', 'Rural', 'Suburbana'],
        required: true,
    },

    // --- Requisitos Estructurados para el Match ---
    requirements: {
        specialty: { type: String, required: true, trim: true }, // Ej: 'Matemáticas', 'Ciencias'
        level: { type: String, required: true, trim: true }, // Ej: 'Primaria', 'Secundaria'
        englishLevel: { type: String, required: true }, // Ej: 'B2', 'C1'
        yearsOfExperience: { type: Number, required: true, default: 0 },
        requiredSkills: [{ type: String, trim: true }] // Habilidades específicas deseadas
    },

    // --- Información Salarial ---
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' },
        period: { type: String, enum: ['Anual', 'Mensual'], default: 'Anual' }
    },
    
    // --- Estado y Visibilidad de la Publicación ---
    status: {
        type: String,
        enum: ['Activa', 'Pausada', 'Cerrada'],
        default: 'Activa',
    },
    isPublic: {
        type: Boolean,
        default: true, // Define si la vacante es visible para los profesores.
    },
    
    // --- Contacto Anónimo (para la vista pública) ---
    contactAlias: {
        type: String,
        required: true,
        default: 'Equipo de Contratación'
    },
    contactRole: {
        type: String,
        required: true,
        default: 'Recursos Humanos'
    }
}, {
    // Añade automáticamente los campos `createdAt` y `updatedAt`.
    timestamps: true,
});

// Índice para mejorar el rendimiento de las búsquedas por ubicación y especialidad.
jobSchema.index({ 'location.state': 1, 'requirements.specialty': 1 });

module.exports = mongoose.model('Job', jobSchema);
