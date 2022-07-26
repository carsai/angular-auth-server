require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/config');

// Base de datos
dbConnection();

// Crear servidor de express
const app = express();

// Publico
app.use(express.static('public'));

// Cors
app.use(cors());

// Parsers
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Angular
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () => console.log(`Iniciando en el servidor ${process.env.PORT}`));
