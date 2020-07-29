require("dotenv").config();

// DECLARANDO COSAS QUE INSTALÉ
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, PORT } = process.env;

const app = express();

// COSAS QUE USA APP
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
});

// REALIZANDO CONEXIÓN
connection.connect( error=> {
if(error) throw error;
console.log('DATABASE UP 😊');
});

// CONEXIÓN A LA API
app.listen(PORT, () =>
    console.log('API UP 😊')
);

// ENVIANDO MENSAJE DE BIENVENIDA
/*
app.get('/', (req, res) => {
    res.send('Hola 👋');
});
*/

// RECOGIENDO TODOS LOS PRODUCTOS
app.get('/productos', (req, res) => {

    // SECUENCIA SQL
    const sql = 'SELECT * FROM listaproductos'

    // CONEXIÓN A LA DDBB
    connection.query( sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            res.json(results);
        }else{
            console.log('No hay productos que mostrar. :(');
        }
    });    
});

// RECOGIENDO TODOS LOS CLIENTES
app.get('/clientes', (req, res) => {

    // SECUENCIA SQL
    const sql = 'SELECT * FROM listaclientes'

    // CONEXIÓN A LA DDBB
    connection.query( sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            res.json(results);
        }else{
            console.log('No hay clientes que mostrar. :(');
        }
    });    
});

// ACTUALIZAR CLIENTES A LA DDBB
app.put('/update/:id', (req, res) => {
    
    // OBJETO DE DATOS QUE RECIBIMOS DE LA VISTA
    const datosCliente = {
        id: req.params.id,
        foto: req.body.foto,
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password
    }
    
    // SECUENCIA SQL
    const sql = `UPDATE listaclientes SET nombre='${datosCliente.nombre}', usuario='${datosCliente.usuario}', email='${datosCliente.email}', password='${datosCliente.password}', foto='${datosCliente.foto}' WHERE id=${datosCliente.id}`
    
    
    // CONEXIÓN A LA BBDD
    connection.query( sql, error => {
        if(error) throw error;
        console.log('Cliente actualizado con éxito. ✔️');
    });
});

// ACTUALIZAR PRODUCTOS A LA DDBB
app.put('/update/productos/:id', (req, res) => {
    
    // OBJETO DE DATOS QUE RECIBIMOS DE LA VISTA
    const datosProducto = {
        id: req.params.id,
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        stock: req.body.stock,
        disponibilidad: req.body.disponibilidad,
    }
    
    // SECUENCIA SQL
    const sql = `UPDATE listaproductos SET imagen='${datosProducto.imagen}', nombre='${datosProducto.nombre}', stock='${datosProducto.stock}', disponibilidad='${datosProducto.disponibilidad}' WHERE id=${datosProducto.id}`
    
    
    // CONEXIÓN A LA BBDD
    connection.query( sql, error => {
        if(error) throw error;
        console.log('Producto actualizado con éxito. ✔️');
    });
});

// BORRANDO CLIENTES EN LA DDBB
app.delete('/delete/:id', (req, res) => {

    // DATOS QUE LLEGAN A LA VISTA
    const id = req.params.id;

    // SECUENCIA SQL
    const sql = `DELETE FROM listaclientes WHERE id=${id}`;

    // CONEXIÓN A LA DDBB
    connection.query(sql, error => {
        if(error) throw error;
        console.log('Cliente borrado con éxito. 😢');
    });
});

// AÑADIR CLIENTES A LA DDBB
app.post('/add', (req, res) => {

    // SECUENCIA SQL
    const sql = 'INSERT INTO listaclientes SET ?'

    // OBJETO DE DATOS DEL NUEVO CLIENTE
    const nuevoCliente = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        foto: req.body.foto,
    }

    // CONEXIÓN A LA DDBB
    connection.query( sql, nuevoCliente, error => {
        if(error) throw error;
        console.log('Cliente creado con éxito. ✔️');
    });
});