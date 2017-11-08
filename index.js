'use strict'

const Sequelize = require('sequelize')
const app = require('./app')
const config = require('./config')

app.listen(config.port, () => {
	console.log(`API REST corriendo en http://localhost:${config.port}/api`)
})

