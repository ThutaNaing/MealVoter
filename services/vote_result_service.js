module.exports = function(app){
	var VoteResult = app.get('models').vote_result,
		Restaurant = app.get('models').restaurant,
		sequelize = app.get('models').sequelize,
		Sequelize = require('sequelize');
	return {
				create: function(voteResultModel) {
					var persistedResult = VoteResult.build(voteResultModel).save();
					persistedResult.catch(function(err) {
						console.log('Exception rising at VoteResult creation service!');
						console.log(err);
					});
					return persistedResult;
				},
				update: function(voteResultModel) {
					var persistedResult = VoteResult.update(
						voteResultModel,
						{ 
							where: {voteResultId: voteResultModel.voteResultId} 
						}
					);
					persistedResult.catch(function(err) {
						console.log('Exception rising at VoteResult updating service!');
						console.log(err);
					});
					return persistedResult;
				},
				findVoteResultByRestaurantId: function(restaurantId) {
					return VoteResult.findOne({
						where: {
							restaurant_Id: restaurantId,
							voteDone: 'OPEN',
							votedDate: new Date().toDateString()
						}
					});
				},
				findAllVoteResults: function() {

					return sequelize.query(
						'SELECT "VR"."voteCount", "RST"."restaurantName" FROM "VoteResult" AS "VR" ' +
						'JOIN "Restaurant" AS "RST" ' +
						'ON "VR"."restaurant_Id" = "RST"."restaurantId" ' +
						'WHERE "VR"."voteDone" = '+"'OPEN'"+' AND "VR"."isWinner" = '+"'N'"+' ',
						{ type: sequelize.QueryTypes.SELECT }
					);

					// return VoteResult.findAll({
					// 	attributes: ['voteCount', 'restaurantName'],
					// 	where: { 
					// 		voteDone: 'OPEN',
					// 		isWinner: 'N'
					// 	},
					// 	include: [Restaurant]
					// });
				},
				findAllVoteResultsForDecision: function() {
					return VoteResult.findAll({
						where: { 
							voteDone: 'OPEN',
							isWinner: 'N'
						}
					});
				},
				findWinnerResults: function(voteResultId) {

					return sequelize.query(
						'SELECT "VR"."voteCount", "RST"."restaurantName" FROM "VoteResult" AS "VR" ' +
						'JOIN "Restaurant" AS "RST" ' +
						'ON "VR"."restaurant_Id" = "RST"."restaurantId" ' +
						'WHERE "VR"."voteResultId" = ?',
						{ replacements: [voteResultId], type: sequelize.QueryTypes.SELECT }
					);

				}
			};
};
// current_date
// AND "VR"."voteResultId" = ?'
// replacements: [voteResultId],

// return sequelize.query(
// 						'SELECT "VR"."voteCount", "RST"."restaurantName" FROM "VoteResult" AS "VR" ' +
// 						'JOIN "Restaurant" AS "RST" ' +
// 						'ON "VR"."restaurant_Id" = "RST"."restaurantId" ' +
// 						'WHERE "VR"."voteDone" = '+"'DONE'"+' AND "VR"."isWinner" = '+"'W' " +
// 						'AND "VR"."voteResultId" = :Vid',
// 						{ replacements: [Vid: voteResultId], type: sequelize.QueryTypes.SELECT }
// 					)

// sequelize.query(
// 						'SELECT "VR"."voteCount", "RST"."restaurantName" FROM "VoteResult" AS "VR" ' +
// 						'JOIN "Restaurant" AS "RST" ' +
// 						'ON "VR"."restaurant_Id" = "RST"."restaurantId" ' +
// 						'WHERE "VR"."votedDate" = current_date ' +
// 						'AND "VR"."voteDone" = '+"'DONE'"+' AND "VR"."isWinner" = '+"'W'"+' ',
// 						{ type: sequelize.QueryTypes.SELECT }
// 					)