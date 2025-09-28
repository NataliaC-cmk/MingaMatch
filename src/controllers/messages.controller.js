/**
 * ==================================================================
 * messages.controller.js - Controlador para Mensajería Interna
 * ==================================================================
 *
 * Maneja la lógica de negocio para crear y gestionar conversaciones
 * y mensajes entre escuelas y profesores.
 */

const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
// --- ¡LÍNEA CORREGIDA! ---
// Se ha añadido la barra diagonal (/) que faltaba en la ruta.
const Job = require('../models/Job'); 

/**
 * @desc    Inicia una nueva conversación o recupera una existente.
 * @route   POST /api/messages/start
 * @access  Private
 */
exports.startOrGetConversation = async (req, res) => {
    try {
        const { recipientId, jobId } = req.body;
        const senderId = req.user.id;
        const senderRole = req.user.role;

        // Determinar quién es la escuela y quién el profesor
        const schoolId = senderRole === 'school' ? senderId : recipientId;
        const teacherId = senderRole === 'teacher' ? senderId : recipientId;

        // Buscar si ya existe una conversación para este contexto
        let conversation = await Conversation.findOne({
            school: schoolId,
            teacher: teacherId,
            job: jobId,
        });

        // Si no existe, crear una nueva
        if (!conversation) {
            // Validar que la vacante exista
            const jobExists = await Job.findById(jobId);
            if (!jobExists) {
                return res.status(404).json({ message: 'La vacante asociada no fue encontrada.' });
            }

            conversation = new Conversation({
                school: schoolId,
                teacher: teacherId,
                job: jobId,
            });
            await conversation.save();
        }

        res.status(200).json(conversation);

    } catch (error) {
        console.error('Error en startOrGetConversation:', error);
        res.status(500).json({ message: 'Error en el servidor al gestionar la conversación.' });
    }
};

/**
 * @desc    Obtiene todas las conversaciones del usuario autenticado.
 * @route   GET /api/messages
 * @access  Private
 */
exports.getConversations = async (req, res) => {
    try {
        const { id: userId, role } = req.user;
        const query = role === 'teacher' ? { teacher: userId } : { school: userId };

        const conversations = await Conversation.find(query)
            .populate('teacher', 'profile.fullName profile.profileImageUrl')
            .populate('school', 'profile.schoolName')
            .sort({ lastMessageAt: -1 });

        res.status(200).json(conversations);
    } catch (error) {
        console.error('Error al obtener conversaciones:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Obtiene todos los mensajes de una conversación específica.
 * @route   GET /api/messages/:conversationId
 * @access  Private
 */
exports.getMessagesForConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        // 1. Validar que el usuario sea parte de la conversación
        const conversation = await Conversation.findById(conversationId);
        if (!conversation || (conversation.teacher.toString() !== userId && conversation.school.toString() !== userId)) {
            return res.status(403).json({ message: 'No tienes acceso a esta conversación.' });
        }

        // 2. Obtener los mensajes
        const messages = await Message.find({ conversation: conversationId }).sort({ createdAt: 'asc' });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc    Envía un nuevo mensaje a una conversación existente.
 * @route   POST /api/messages
 * @access  Private
 */
exports.sendMessage = async (req, res) => {
    try {
        const { conversationId, content } = req.body;
        const senderId = req.user.id;
        const senderRole = req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1); // 'Teacher' o 'School'

        // 1. Validar que la conversación exista y que el usuario sea participante
        const conversation = await Conversation.findById(conversationId);
        if (!conversation || (conversation.teacher.toString() !== senderId && conversation.school.toString() !== senderId)) {
            return res.status(403).json({ message: 'No tienes permiso para enviar mensajes a esta conversación.' });
        }
        
        // 2. Crear el nuevo mensaje
        const newMessage = new Message({
            conversation: conversationId,
            sender: senderId,
            senderModel: senderRole,
            content,
        });

        // 3. Guardar el mensaje y actualizar la conversación
        await newMessage.save();

        conversation.lastMessageAt = new Date();
        conversation.lastMessageSnippet = content.substring(0, 40) + (content.length > 40 ? '...' : '');
        await conversation.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};


