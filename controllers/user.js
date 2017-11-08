'use strict'

const models = require('../models/index.js')
const service = require('../services')


function getUsers(req, res) {
	models.User.findAll({ raw: true }).then(users => {
		return res.status(200).send({ users: users })
	})
		.catch((err) => { return res.status(500).send({ err }) })
}

function getUser(req, res) {
	models.User.findById(req.params.userId).then(user => {

		if (user) return res.status(200).send({ user: user })

		else return res.status(404).send({ message: `El usuario no existe` })
	})
		.catch((err) => { return res.status(500).send({ err }) })
}

function signUp(req, res) {
	models.User.create(req.body)
		.then(newUser => {
			return res.status(200).send({ user: newUser, token: service.createToken(newUser) })
		})
		.catch((err) => { return res.status(500).send({ err }) })
}

function signIn(req, res) {
	models.User.find({
		where: { username: req.body.username, password: req.body.password }
	}).then(user => {
		return res.status(200).send({ message: `Te has logeado correctamente`, user: user, token: service.createToken(user) })
	})
	.catch((err) => { return res.status(500).send({ message: `Datos invalidos` }) })
}

function updateUser(req, res) {
	models.User.update(req.body, { where: { id: req.params.userId } }).then(userUpdated => {

		let message = `El usuario ha sido actualizado exitosamente`
		if (userUpdated == 0) message = `No se ha podido actualizar al usuario`

		res.status(200).send({ message: message })

	}).catch((err) => { return res.status(500).send({ err }) })
}

function deleteUser(req, res) {
	models.User.destroy({ where: { id: req.params.userId } }).then(userDeleted => {

		let message = `El usuario ha sido eliminado exitosamente`
		if (userDeleted == 1) message = `No se ha podido eliminar al usuario`

		res.status(200).send({ message: message })
	})
		.catch((err) => { return res.status(500).send({ err }) })
}

module.exports = {
	getUsers,
	getUser,
	signUp,
	updateUser,
	deleteUser,
	signIn
}