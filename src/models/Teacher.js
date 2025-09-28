// src/models/Teacher.js (Versión Final)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Sub-esquemas para organizar la información
const educationSchema = new Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    graduationYear: String,
});

const experienceSchema = new Schema({
    institution: String,
    position: String,
    grades: String,
    responsibilities: String,
    duration: String,
    contactInfo: String
});

const teacherProfileSchema = new Schema({
    // Información Básica
    fullName: { type: String, trim: true },
    birthDate: { type: Date },
    nationality: { type: String },
    residenceCountry: { type: String },
    
    // Documentos y Archivos
    profilePictureUrl: { type: String, default: '' },
    presentationVideoUrl: { type: String, default: '' },
    credentialPdfUrl: { type: String, default: '' },
    cvUrl: { type: String, default: '' }, // Campo añadido para el CV
    passportUrl: { type: String, default: '' },
    teachingLicenseUrl: { type: String, default: '' },
    
    // Educación y Experiencia
    education: [educationSchema],
    workExperience: [experienceSchema],

    // Habilidades
    languages: [{ lang: String, level: String }],
    skills: [String], // Para metodologías como IB, Montessori, etc.

    // Estado del Onboarding
    onboardingStatus: {
        agreementAccepted: { type: Boolean, default: false },
        documentsPrepared: { type: Boolean, default: false },
        filesUploaded: { type: Boolean, default: false },
        personalInfoComplete: { type: Boolean, default: false },
    },
    
    // Preferencias y Disponibilidad
    availability: {
        type: String,
        enum: ['Colombia', 'EE.UU.', 'Ambos'],
        default: 'Ambos'
    },
    isActive: { type: Boolean, default: false } // Para activar/inactivar perfil
});

const teacherSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'teacher' },
    profile: { type: teacherProfileSchema, default: () => ({}) }
}, { timestamps: true });

teacherSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

teacherSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);