/**
 * ==================================================================
 * ai.controller.js - Controlador para la Lógica de IA
 * ==================================================================
 *
 * Maneja la interacción con modelos de lenguaje externos (Google Gemini)
 * para generar análisis inteligentes sobre la idoneidad de un candidato.
 *
 * Dependencia: node-fetch@2 (`npm install node-fetch@2`)
 */

const Teacher = require('../models/Teacher');
const Job = require('../models/Job');
const fetch = require('node-fetch');

/**
 * @desc    Analiza la idoneidad de un profesor para una vacante usando IA.
 * @route   POST /api/ai/analyze-candidate
 * @access  Private (School, Admin)
 */
exports.analyzeCandidate = async (req, res) => {
    const { teacherId, jobId } = req.body;

    if (!teacherId || !jobId) {
        return res.status(400).json({ message: 'Faltan los IDs del profesor o de la vacante.' });
    }

    try {
        // 1. Obtener los perfiles completos de la base de datos.
        const teacher = await Teacher.findById(teacherId);
        const job = await Job.findById(jobId);

        if (!teacher || !job) {
            return res.status(404).json({ message: 'No se encontró al profesor o la vacante.' });
        }

        // 2. Construir un prompt detallado y profesional para la IA.
        const prompt = `
            Actúa como un reclutador experto y bilingüe para escuelas de primaria y secundaria en Estados Unidos.
            Tu tarea es analizar el perfil de un profesor y compararlo con los requisitos de una vacante.
            Genera un párrafo conciso y profesional (máximo 90 palabras) que resuma la idoneidad del candidato para el puesto.
            Destaca 2-3 fortalezas clave y menciona alguna posible área a explorar en la entrevista si es evidente.
            Tu respuesta debe ser objetiva, profesional y escrita en español.

            ---
            PERFIL DEL PROFESOR:
            - Resumen Profesional: ${teacher.profile.professionalSummary || 'No proporcionado.'}
            - Especialidad Principal: ${teacher.profile.education[0]?.fieldOfStudy || 'No especificada.'}
            - Nivel de Inglés: ${teacher.profile.englishLevel || 'No especificado.'}
            - Habilidades: ${teacher.profile.skills ? teacher.profile.skills.join(', ') : 'No especificadas.'}
            - Certificación Oficial de Profesor: ${teacher.profile.hasOfficialTeacherCert ? 'Sí' : 'No'}
            - Evaluación de Credenciales de EE.UU.: ${teacher.profile.hasCredentialEvaluation ? 'Sí' : 'No'}

            ---
            REQUISITOS DE LA VACANTE:
            - Título del Puesto: ${job.title}
            - Especialidad Requerida: ${job.requirements.specialty}
            - Nivel de Inglés Mínimo: ${job.requirements.englishLevel}
            - Habilidades Deseadas: ${job.requirements.requiredSkills ? job.requirements.requiredSkills.join(', ') : 'No especificadas.'}
            - Descripción: ${job.description}
            ---

            Análisis de Idoneidad:
        `;
        
        // 3. Llamar a la API de Gemini de forma segura.
        const API_KEY = process.env.GEMINI_API_KEY; 
        if (!API_KEY) {
            console.error('Error: La API Key de Gemini no está configurada en el servidor.');
            return res.status(500).json({ message: 'Servicio de IA no configurado.' });
        }
        
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

        const apiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            console.error("Error desde la API de IA:", errorBody);
            throw new Error('El servicio de IA no pudo procesar la solicitud en este momento.');
        }

        const data = await apiResponse.json();
        
        // Verificación de seguridad para la respuesta de la IA
        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
             throw new Error('La IA devolvió una respuesta inesperada.');
        }
        
        const analysis = data.candidates[0].content.parts[0].text;

        res.status(200).json({ analysis });

    } catch (error) {
        console.error('Error en el análisis con IA:', error);
        res.status(500).json({ message: error.message || 'Error en el servidor al generar el análisis.' });
    }
};