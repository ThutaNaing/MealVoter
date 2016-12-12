module.exports = function(sequelize, DataTypes) {

	var Restaurant = sequelize.define('Restaurant', {
			restaurantId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey: true
			},
			restaurantName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			place: {
				type: DataTypes.TEXT
			},
			phNo: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true,
			// classMethods: {
			// 	associate: function(models) {
			// 		Restaurant.hasMany(models.Menu, {as: 'menus' });
			// 	}
			// }
		}
	);
	return Restaurant;

};