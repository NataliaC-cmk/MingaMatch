const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.status(200).json({ resources }); // Devuelto como objeto para consistencia
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al obtener los recursos.' });
    }
};

exports.createResource = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para crear recursos.' });
        }
        const resourceData = { ...req.body, createdBy: req.user.id };
        const newResource = await Resource.create(resourceData);
        res.status(201).json({ message: 'Recurso creado con éxito.', resource: newResource });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al crear el recurso.' });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar recursos.' });
        }
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Recurso no encontrado.' });
        }
        await Resource.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Recurso eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al eliminar el recurso.' });
    }
};
