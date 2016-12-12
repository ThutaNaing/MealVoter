var Sequelize = require('sequelize');
var sequelize = new Sequelize('mealvoterdb', 'mealvoterdb', 'mealvoterdb', {
	host: '127.0.0.1',
	port: 5433,
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports = sequelize;
