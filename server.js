const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Importación de Rutas ---
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const teacherRoutes = require('./src/routes/teacher.routes');
const interviewRoutes = require('./src/routes/interview.routes');
const jobRoutes = require('./src/routes/job.routes');
const applicationRoutes = require('./src/routes/application.routes');
const resourceRoutes = require('./src/routes/resource.routes'); // <-- Ruta añadida

// --- Uso de Rutas ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resources', resourceRoutes); // <-- Ruta añadida

app.get('/api', (req, res) => {
  res.send('API de Minga Match está funcionando...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});