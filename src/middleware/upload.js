const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear el directorio de subidas si no existe
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        // Generar un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + req.user.id + '-' + uniqueSuffix + fileExtension);
    }
});

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Definir los tipos de archivo permitidos para cada campo
    if (file.fieldname === "profilePicture") {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (jpeg, png, gif).'), false);
        }
    } else if (file.fieldname === "presentationVideo") {
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/x-matroska') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten videos (mp4, mov, mkv).'), false);
        }
    } else if (file.fieldname === "credentialPdf") {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF.'), false);
        }
    } else {
        cb(null, false); // Ignorar otros archivos
    }
};

// Inicializar Multer con la configuración
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // Límite de 50MB por archivo
    },
    fileFilter: fileFilter
});

// Exportar el middleware configurado para manejar múltiples campos
// Los nombres ('profilePicture', 'presentationVideo') DEBEN coincidir con los del formulario del frontend
module.exports = upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'presentationVideo', maxCount: 1 },
    { name: 'credentialPdf', maxCount: 1 }
]);