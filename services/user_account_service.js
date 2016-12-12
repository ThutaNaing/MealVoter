module.exports = function(app){
	var UserAccount = app.get('models').user_account;
	return {
				create: function(userAccModel) {
					var persistedResult = UserAccount.build(userAccModel).save();
					persistedResult.catch(function(err) {
						console.log('Exception rising at userAccount creation service!');
						console.log(err);
					});
					return persistedResult;
				},
				findByUsername: function(userAccountName) {
					return UserAccount.findOne({
						where: {
							userAccountName: userAccountName,
						}
					});
				},
				findById: function(userAccountId) {
					return UserAccount.findOne({
						where: { userAccountId: userAccountId }
					});
				},
				findAll: function() {
					return UserAccount.findAll();
				}
			};
};