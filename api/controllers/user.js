'use strict'

//bcrypt para cifrar las contraseñas
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

//Métodos de prueba
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

//Registro
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if(params.name && params.surname &&
		params.nick && params.email && params.password){

		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		//Controlar usuarios duplicados
		User.find({ $or:[
							{email: user.email.toLowerCase()},
							{nick: user.nick.toLowerCase()}
						]}).exec((err, users) =>{
							if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});

							if(users && users.length >= 1){
								return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
							
							}else{

								//Cifra la password y me guarda los datos
								bcrypt.hash(params.password, null, null, (err, hash)=>{
									user.password = hash;
									user.save((err, userStored) =>{
										if(err) return res.status(500).send({message: 'Error al guardar el usuario'});
								
										if(userStored){
											res.status(200).send({user: userStored});
										}else{
											res.status(404).send({message: 'No se ha registrado el usuario'});

										}

									});

								});


							}

						});
		

	}else{
		res.status(200).send({
			message: 'Envía todos los campos necesarios!!'
		});
	}
}



//Login
function loginUser(req, res){
	var params = req.body;
	var email = params.email;
	var password = params.password;

	console.log(email);

	User.findOne({email: email}, (err, user) => {
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if (user) {
			bcrypt.compare(password, user.password, (err, check) => {
				if (check) {
					//devolver datos de usuario
					if(params.gettoken){
						//generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(user)
						});

					}else{
						//devolver datos de usuario
						user.password = undefined;
						return res.status(200).send({user});
					}

					
				}else{
					return res.status(404).send({message: 'El usuario no se ha podido identificar'});
				}
			});
		
		}else{
			return res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
		}
	});


}



//Conseguir datos de un usuario
function getUser(req, res){
	var userId = req.params.id;

	User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Error en la petición'});

		if(!user) return res.status(404).send({message: 'El usuario no existe'});

		return res.status(200).send({user});
	});

}



module.exports = {
	home,
	pruebas,
	saveUser,
	loginUser,
	getUser
}