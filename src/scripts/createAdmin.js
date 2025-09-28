/**
 * ==================================================================
 * createAdmin.js - Script de Único Uso para Crear un Administrador
 * ==================================================================
 * Ejecuta este script desde la terminal para crear el primer usuario
 * administrador en la base de datos.
 *
 * USO: node src/scripts/createAdmin.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// --- CONFIGURACIÓN DEL NUEVO ADMINISTRADOR ---
// ¡IMPORTANTE! Cambia este email y contraseña por los que desees.
const ADMIN_EMAIL = 'admin@mingamatch.com';
const ADMIN_PASSWORD = 'supersecretpassword';
// -----------------------------------------

const createAdmin = async () => {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
        console.error('❌ Error: MONGODB_URI no está definida en .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB para crear admin...');

        const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            console.warn('⚠️  El administrador con este email ya existe.');
            return;
        }

        const newAdmin = new Admin({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        });

        await newAdmin.save();
        console.log('✅ ¡Administrador creado con éxito!');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Contraseña: ${ADMIN_PASSWORD} (Recuerda usar esta para el login)`);

    } catch (error) {
        console.error('❌ Error al crear el administrador:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Conexión a MongoDB cerrada.');
    }
};

createAdmin();