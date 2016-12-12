var express = require('express'),
	router = express.Router(),
	moment = require('moment'),
	restaurantEntryService = require('../../services/restaurant_entry_service'),
	pollVoteService = require('../../services/poll_vote_service'),
	voteResultService = require('../../services/vote_result_service');

router.get('/board', function(req, res, next) {
	if(req.user.userRole === 'A') {
		res.render('poll_board', { user: req.user });
	} else {
		res.render('poll_board');
	}
});
router.post('/board/:restaurant_id', function(req, res, next) {
	console.log('/board/:restaurant_id post method work! '+req.params.restaurant_id);
	var pollVoteServiceObj = pollVoteService(req.app);
	var voteResultServiceObj = voteResultService(req.app);
	var sequelize = req.app.get('models').sequelize;
	var voteBoardPromiseVal = pollVoteServiceObj.findVoteBoardByUserAccount(req.user);
	var voteResultPromiseVal = voteResultServiceObj.findVoteResultByRestaurantId(req.params.restaurant_id);

	voteBoardPromiseVal.then(function(voteBoardList) {
		// console.log('------------------------------');
		// console.log(voteBoardList.length);
		if(!voteBoardList || voteBoardList.length <= 0) {

			sequelize.transaction(function (t) {

				return pollVoteServiceObj.create({
					voteDone: 'DONE',
					votedDate: new Date(),
					restaurant_Id: req.params.restaurant_id,
					user_Account_Id: req.user.userAccountId
				}, {transaction: t}).then(function(voteBoardModel) {

					voteResultPromiseVal.then(function(voteResultList) {
						console.log('************************');
						console.log(voteResultList);
						console.log('************************');
						var currentDate = new Date();
						// var currentDateStr = 
						// 	(currentDate.getDay() + currentDate.getMonth() + currentDate.getDate());
						if(!voteResultList || voteResultList.length <= 0) {
							console.log('===========Creating the vote Result!');
							return voteResultServiceObj.create({
								restaurant_Id: req.params.restaurant_id,
								voteDone: 'OPEN',
								voteCount: 1,
								isWinner: 'N',
								// votedDate: utils(currentDate),
								// votedDate: moment(currentDate).format('YYYYMMDD'),
								votedDate: currentDate,
							}, {transaction: t})
							.then(function(obj){})
							.catch(function(err){throw new Error();});
						} else {
							console.log('===========Updating the vote Result!');
							return voteResultServiceObj.update({
								voteResultId: voteResultList.voteResultId,
								restaurant_Id: voteResultList.restaurant_Id,
								// voteDone: voteResultList.voteDone,
								voteCount: (voteResultList.voteCount + 1),
								// isWinner: voteResultList.isWinner
							}, {transaction: t})
							.then(function(obj){})
							.catch(function(err){throw new Error();});
						}
					});
					res.end();

				});

			}).then(
				function(result) {console.log(result);}
			).catch(
				function(err) {console.log(err);}
			);

		} else {
			res.redirect(307, "/");
		}
	});
});
router.post('/restaurant', function(req, res, next) {
	console.log('/restaurant post method work!');
	var restaurantPromiseVal = restaurantEntryService(req.app).findAllWithMenuList();
	restaurantPromiseVal.then(function(restaurantModel) {
		res.json(restaurantModel);
		res.end();
	});
});

module.exports = router;