module.exports = function(sequelize, DataTypes) {
	var VoteBoard = sequelize.define("VoteBoard", {
	    	voteBoardId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey: true
			},
			voteDone: {
				type: DataTypes.STRING,
				allowNull: false
			},
			votedDate: {
				type: DataTypes.DATEONLY,
				allowNull: false
			}
	  	}, 
  		{
    		freezeTableName: true
		}
	);
	return VoteBoard;
};