const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Intenta conectarse a la base de datos usando la variable de entorno MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si la conexión es exitosa, muestra un mensaje en la consola
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si hay un error en la conexión, muestra el error y cierra la aplicación
    console.error(`Error en la conexión a la base de datos: ${error.message}`);
    process.exit(1); // Detiene la ejecución de la app con un código de error
  }
};

module.exports = connectDB;