// src/controllers/applications.controller.js

const Application = require('../models/Application');
const Job = require('../models/Job');
const Teacher = require('../models/Teacher');

// --- Algoritmo de "Match Score" Inteligente (Ajustado) ---
const calculateMatchScore = (teacher, job) => {
    let score = 0;
    const reasons = [];

    if (!teacher.profile || !job.requirements) {
        return { score: 0, reasons: ["Faltan datos del perfil o de la vacante."] };
    }
    const { profile } = teacher;
    const { requirements } = job;

    // 1. Coincidencia de Especialidad
    if (profile.subjects && profile.subjects.some(s => s.toLowerCase() === requirements.specialty?.toLowerCase())) {
        score += 40;
        reasons.push("✅ Coincidencia de especialidad.");
    } else {
        reasons.push("⚠️ La especialidad no coincide.");
    }

    // 2. Nivel de Inglés
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'];
    const teacherLevelIndex = levels.indexOf(profile.englishLevel);
    const jobLevelIndex = levels.indexOf(requirements.englishLevel);
    if (teacherLevelIndex >= jobLevelIndex) {
        score += 30;
        reasons.push("✅ Nivel de inglés cumple o supera el requisito.");
    } else {
        reasons.push("⚠️ Nivel de inglés por debajo del requisito.");
    }
    
    // 3. Años de Experiencia
    if (profile.totalExperience >= requirements.yearsOfExperience) {
        score += 30;
        reasons.push("✅ Años de experiencia cumplen o superan el requisito.");
    } else {
        reasons.push("⚠️ Años de experiencia por debajo del requisito.");
    }
    
    score = Math.min(score, 100);
    return { score, reasons };
};

// --- El resto de tus funciones son excelentes, se mantienen ---
exports.applyToJob = async (req, res) => {
    // ... tu código ...
};
exports.getApplicationsForJob = async (req, res) => {
    // ... tu código con el nuevo `calculateMatchScore` ...
};
exports.updateApplicationStatus = async (req, res) => {
    // ... tu código ...
};
exports.getMyApplications = async (req, res) => {
    // ... tu código ...
};