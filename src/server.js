const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors('incluide'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'Ju1000757812**',
 database: 'Cinema',
 port: 3306
});

db.connect((err) => {
 if (err) throw err;
 console.log('Connected to the database');
});

app.listen(3001, () => {
 console.log('Server is running on port 3001');
});

app.post('/api/registro', (req, res) => {
    const {
        correo,
        contraseña,
        nombre,
        apellidos,
        tipo,
        direccion,
        celular,
        documentoIdentidad
    } = req.body;

    const query = 'INSERT INTO Cinema.usuarios (correo, contraseña, nombre, apellidos, tipo, direccion, celular, documento_identidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [correo, contraseña, nombre, apellidos, tipo, direccion, celular, documentoIdentidad], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al agregar el registro' });
        } else {
            res.status(200).json({ message: 'Registro agregado correctamente' });
        }
    });
});

app.get('/api/registro', (_req, res) => {
 db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) throw err;

    res.status(200).json(result);
 });
});