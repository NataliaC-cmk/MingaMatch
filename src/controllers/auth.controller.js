/**
 * ==================================================================
 * auth.controller.js - Controlador de Autenticación (Optimizado)
 * ==================================================================
 */

const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const School = require('../models/School');
const Admin = require('../models/Admin');

// --- Helper para generar el token JWT ---
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

/**
 * @desc     Registra un nuevo profesor.
 * @route    POST /api/auth/register-teacher
 * @access   Public
 */
exports.registerTeacher = async (req, res) => {
    const { email, password, profile } = req.body;
    try {
        const userExists = await Teacher.findOne({ email }) || await School.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }

        const newTeacher = await Teacher.create({
            email,
            password,
            profile: { fullName: profile.fullName }
        });

        res.status(201).json({
            message: 'Profesor registrado con éxito.',
            token: generateToken(newTeacher._id, newTeacher.role),
            role: newTeacher.role,
            userId: newTeacher._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al registrar profesor.' });
    }
};

/**
 * @desc     Registra una nueva escuela.
 * @route    POST /api/auth/register-school
 * @access   Public
 */
exports.registerSchool = async (req, res) => {
    const { email, password, profile } = req.body;
    try {
        const userExists = await Teacher.findOne({ email }) || await School.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }
        
        const newSchool = await School.create({
            email,
            password,
            profile: { schoolName: profile.schoolName }
        });

        res.status(201).json({ 
            message: 'Escuela registrada con éxito. La cuenta está pendiente de aprobación.',
            token: generateToken(newSchool._id, newSchool.role),
            role: newSchool.role,
            userId: newSchool._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al registrar escuela.' });
    }
};

/**
 * @desc     Autentica un usuario (Teacher, School, o Admin).
 * @route    POST /api/auth/login
 * @access   Public
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'El email y la contraseña son obligatorios.' });
    }

    try {
        let user;
        let userRole;

        // Búsqueda automática en las tres colecciones
        user = await Teacher.findOne({ email });
        if (user) {
            userRole = 'teacher';
        } else {
            user = await School.findOne({ email });
            if (user) {
                userRole = 'school';
            } else {
                user = await Admin.findOne({ email });
                if (user) {
                    userRole = 'admin';
                }
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Verificación de contraseña según el rol
        let isPasswordMatch = false;
        if (userRole === 'admin') {
            // Usa el método específico del modelo Admin
            isPasswordMatch = await user.comparePassword(password);
        } else {
            // Usa el método de los modelos Teacher y School
            isPasswordMatch = await user.matchPassword(password);
        }

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Si la contraseña es correcta, generar token y enviar respuesta
        const token = jwt.sign({ id: user._id, role: userRole }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ 
            token, 
            role: userRole, 
            userId: user._id 
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

/**
 * @desc     Obtiene el perfil del usuario actualmente autenticado.
 * @route    GET /api/auth/me
 * @access   Private
 */
exports.getMe = async (req, res) => {
    try {
        const { id, role } = req.user;
        let userProfile = null;

        if (role === 'teacher') {
            userProfile = await Teacher.findById(id).select('-password');
        } else if (role === 'school') {
            userProfile = await School.findById(id).select('-password');
        } else if (role === 'admin') {
            userProfile = await Admin.findById(id).select('-password');
        }
        
        if (!userProfile) {
            return res.status(404).json({ message: 'Perfil de usuario no encontrado.' });
        }

        res.status(200).json({ profile: userProfile, role });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor al obtener el perfil." });
    }
};


