'use strict'

var User = require('../models/user');

function home(req, res) {
	res.status(200).send({
		message: 'Hola Mundo desde servidor NodeJS'
	});
}

function pruebas(req, res)  {
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor NodeJS'
	});
}

module.exports = {
	home,
	pruebas
}