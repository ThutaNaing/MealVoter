module.exports = function(app){
	var VoteBoard = app.get('models').vote_board;
	return {
				create: function(voteBoardModel) {
					var persistedResult = VoteBoard.build(voteBoardModel).save();
					persistedResult.catch(function(err) {
						console.log('Exception rising at VoteBoard creation service!');
						console.log(err);
					});
					return persistedResult;
				},
				findVoteBoardByUserAccount: function(userAccountModel) {
					return VoteBoard.findOne({
						where: {
							user_Account_Id: userAccountModel.userAccountId,
							voteDone: 'DONE',
							votedDate: new Date().toDateString()
						}
					});
				},
				findById: function(userAccountId) {
					return VoteBoard.findOne({
						where: { userAccountId: userAccountId }
					});
				}
			};
};