'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');

//middlewares (son métodos que se ejecutan antes que lleguen a un controlador
//en cada petición se va ejecutar el middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//cors

//rutas
app.use('/api', user_routes);


//exportar
module.exports = app;