'use strict'

const Sequelize = require('sequelize')
const config = require('../config')

// initialize database connection
var sequelize = new Sequelize(config.db, config.user, config.pass, { define: { timestamps: false }, host: 'localhost', dialect: 'mysql', pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } })

// load models
var models = [
    'User'
  ]
models.forEach(function(model) {module.exports[model] = sequelize.import(__dirname + '/' + model)})

module.exports.sequelize = sequelize
