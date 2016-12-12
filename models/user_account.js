module.exports = function(sequelize, DataTypes) {
	var UserAccount = sequelize.define("UserAccount", {
	    	userAccountId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey: true
			},
			userAccountName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			userPassword: {
				type: DataTypes.STRING,
				allowNull: false
			},
			userRole: {
				type: DataTypes.STRING,
				allowNull: false
			}
	  	}, 
  		{
    		freezeTableName: true
		}
	);
	return UserAccount;
};