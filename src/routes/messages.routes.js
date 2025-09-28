/**
 * ==================================================================
 * messages.routes.js - Enrutador para Mensajería Interna
 * ==================================================================
 *
 * Define todas las rutas de la API para la creación y gestión de
 * conversaciones y mensajes, asegurando que solo los usuarios
 * autenticados puedan acceder.
 */

const express = require('express');
const router = express.Router();

// Importaciones
const {
    startOrGetConversation,
    getConversations,
    getMessagesForConversation,
    sendMessage
} = require('../controllers/messages.controller.js');
const authMiddleware = require('../middleware/authMiddleware');

// --- Definición de Rutas ---

/**
 * @desc    Inicia una nueva conversación o recupera una existente.
 * @route   POST /api/messages/start
 * @access  Private (Cualquier usuario autenticado)
 */
router.post('/start', authMiddleware, startOrGetConversation);

/**
 * @desc    Obtiene todas las conversaciones del usuario autenticado.
 * @route   GET /api/messages
 * @access  Private
 */
router.get('/', authMiddleware, getConversations);

/**
 * @desc    Obtiene todos los mensajes de una conversación específica.
 * @route   GET /api/messages/:conversationId
 * @access  Private
 */
router.get('/:conversationId', authMiddleware, getMessagesForConversation);

/**
 * @desc    Envía un nuevo mensaje a una conversación existente.
 * @route   POST /api/messages
 * @access  Private
 */
router.post('/', authMiddleware, sendMessage);

module.exports = router;