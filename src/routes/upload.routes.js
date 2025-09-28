/**
 * ==================================================================
 * upload.routes.js - Enrutador para la Subida de Archivos
 * ==================================================================
 *
 * Define la ruta y la lógica para manejar la subida de archivos
 * (fotos de perfil, videos, PDFs) utilizando multer.
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Importaciones
const authMiddleware = require('../middleware/authMiddleware');

// --- Middleware de Verificación de Rol ---
const checkTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') return next();
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de profesor.' });
};

// --- Configuración de Multer para Almacenamiento ---

// Directorio base para todas las subidas
const uploadsBaseDir = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determinar la subcarpeta según el tipo de archivo
        const { type } = req.body; // 'photo', 'video', 'homologacion'
        let subfolder = 'others';
        if (type === 'photo') subfolder = 'photos';
        if (type === 'video') subfolder = 'videos';
        if (type === 'homologacion') subfolder = 'documents';

        const finalUploadPath = path.join(uploadsBaseDir, subfolder);

        // Asegurarse de que el directorio de destino exista
        fs.mkdirSync(finalUploadPath, { recursive: true });
        
        cb(null, finalUploadPath);
    },
    filename: function (req, file, cb) {
        // Crear un nombre de archivo único para evitar colisiones
        const uniqueSuffix = `${req.user.id}-${Date.now()}`;
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    }
});

const upload = multer({ storage: storage });

// --- Definición de Ruta ---

/**
 * @desc    Sube un único archivo (foto, video, etc.).
 * @route   POST /api/upload
 * @access  Private (Teacher)
 */
router.post('/', authMiddleware, checkTeacher, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        // Construir la URL pública del archivo
        const fileType = req.body.type || 'others';
        let subfolder = 'others';
         if (fileType === 'photo') subfolder = 'photos';
         if (fileType === 'video') subfolder = 'videos';
         if (fileType === 'homologacion') subfolder = 'documents';

        const fileUrl = `/uploads/${subfolder}/${req.file.filename}`;

        res.status(200).json({
            message: 'Archivo subido con éxito.',
            url: fileUrl
        });

    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({ message: 'Error en el servidor al procesar el archivo.' });
    }
});

module.exports = router;