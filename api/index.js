'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//Conexión Database
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient: true})
//ADVERTENCIA: La opción `useMongoClient` ya no es necesaria en mongoose 5.x, elimínela.
mongoose.connect('mongodb://localhost:27017/curso_mean_social')
	.then(() => {
		console.log("La conexiónn a la bd curso_mean_social se ha realizado correctamente!");

		//Crear servidor
		app.listen(port, () => {
			console.log("Servidor corriendo en http://localhost:3800");
		});
	})
	.catch(err => console.log(err));