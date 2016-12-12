module.exports = function(sequelize, DataTypes) {
	var VoteResult = sequelize.define("VoteResult", {
		
	    	voteResultId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey: true
			},
			voteDone: {
				type: DataTypes.STRING,
				allowNull: false
			},
			voteCount: {
				type: DataTypes.INTEGER.ZEROFILL,
			},
			isWinner: {
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
	return VoteResult;
};