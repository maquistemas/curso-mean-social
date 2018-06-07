'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas


//middlewares (son métodos que se ejecutan antes que lleguen a un controlador
//en cada petición se va ejecutar el middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//cors

//rutas
app.get('/pruebas', (req, res) => {
	res.status(200).send({
		message: 'Accion de pruebas en el servidor NodeJS'
	});
});


//exportar
module.exports = app;