const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:J4ck4ndD14n3!@localhost:5432/workoutlog");

module.exports = sequelize;