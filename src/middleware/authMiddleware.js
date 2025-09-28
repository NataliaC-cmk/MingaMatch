// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token;

    // El token se envía en el header de autorización así: 'Bearer TOKEN'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header (quitando 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token con el secreto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Añadir los datos del usuario decodificados (id y role) al objeto request
            // para que las siguientes funciones puedan usarlo
            req.user = decoded;

            next(); // Continuar a la siguiente función (el controlador)
        } catch (error) {
            console.error('Error de autenticación:', error);
            res.status(401).json({ message: 'Token no válido, autorización denegada.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No hay token, autorización denegada.' });
    }
};

module.exports = authMiddleware;