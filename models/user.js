'use strict'

const config = require('../config')
const Sequelize =  require('sequelize')

var sequelize = new Sequelize(config.db, config.user, config.pass, { define: { timestamps: false }, host: 'localhost', dialect: 'mysql', pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } })
module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('users', {
		firstName: {type: DataTypes.STRING, field: 'first_name'},
		lastName: {type: DataTypes.STRING, field: 'last_name'},
		email: {type: DataTypes.STRING, field: 'email'},
		username: {type: DataTypes.STRING, field: 'username'},	
		password: {type: DataTypes.STRING, field: 'password' }	
	}, {freezeTableName: true}
)
	return User
}


