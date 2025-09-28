const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['Documentos', 'Webinars', 'Guías', 'Enlaces Útiles'],
        default: 'Documentos',
    },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, trim: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    }
}, { timestamps: true });

resourceSchema.index({ category: 1 });

module.exports = mongoose.model('Resource', resourceSchema);