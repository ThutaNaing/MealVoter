var Sequelize = require('sequelize'),
	path = require('path'),
	sequelize = require('./common/db_config');

var models = [
	'user_account',
	'restaurant',
	'menu',
	'vote_board',
	'vote_result'
];

models.forEach(function(model) {
	module.exports[model] = sequelize.import(path.join(__dirname, model));
	// db[model] = sequelize.import(path.join(__dirname, model));
	// if(db[model].associate) {
	// 	db[model].associate(db);
	// }
	console.log(path.join(__dirname, model));
});
void function(m){
	m.menu.belongsTo(m.restaurant, { foreignKey: 'restaurant_Id', as: 'Restaurant' });
	m.restaurant.hasMany(m.menu, { foreignKey: 'restaurant_Id' });

	m.restaurant.belongsToMany(m.user_account, { through: m.vote_board, foreignKey: 'restaurant_Id' });
	m.user_account.belongsToMany(m.restaurant, { through: m.vote_board, foreignKey: 'user_Account_Id' });
	m.restaurant.hasMany(m.vote_result, { foreignKey: 'restaurant_Id' });
}(module.exports);

module.exports.sequelize = sequelize;