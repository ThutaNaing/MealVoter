module.exports = function(sequelize, DataTypes) {

	var Menu = sequelize.define('Menu', {
			menuId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey: true
			},
			menuName: {
				type: DataTypes.STRING
			},
			price: {
				type: DataTypes.DOUBLE
			},
			code: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.STRING(500)
			}
		},
		{
			freezeTableName: true
		}
	);
	return Menu;

};