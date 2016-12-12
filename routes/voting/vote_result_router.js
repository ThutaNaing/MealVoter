var express = require('express'),
	router = express.Router(),
	voteResultService = require('../../services/vote_result_service'),
	userAccountService = require('../../services/user_account_service');

router.get('/result', function(req, res, next) {
	if(req.user.userRole === 'A') {
		res.render('vote_result', { user: req.user });
	} else {
		res.render('vote_result');
	}
});
router.post('/result', function(req, res, next) {
	voteResultService(req.app).findAllVoteResults()
		.then(function(voteCount) {
			res.json(voteCount);
			res.end();
		}).catch(function(err) {
			console.log(err);
		});
});
router.post('/winner', function(req, res, next) {

	voteResultService(req.app).findAllVoteResultsForDecision()
		.then(function(resultList) {

			userAccountService(req.app).findAll()
				.then(function(userAccList) {
					console.log(userAccList.length);

					if(userAccList || userAccList.length > 0) {

						resultList.forEach(function(result) {

							if(result.voteCount === userAccList.length
								|| result.voteCount === userAccList.length-1) {

								voteResultService(req.app).update({
									voteResultId: result.voteResultId,
									isWinner: 'W'
								}).then(function(obj) {
									console.log('Hay we updated ........................');
									console.log(obj);
								});
								req.app.set('checkHasWinner', true);
								req.app.set('winner', result.voteResultId);
								console.log(req.app.get('winner'));
							}
							
						});

						if(req.app.get('checkHasWinner')) {

							resultList.forEach(function(result) {
								voteResultService(req.app).update({
									voteResultId: result.voteResultId,
									voteDone: 'DONE'
								}).then(function(obj) {
									console.log(obj);
								});
							});

						}
						
					}

					console.log('Hay we arrive inner path too ........................');
					voteResultService(req.app).findWinnerResults(req.app.get('winner'))
						.then(function(winner) {
							console.log('Hay we arrive inner path too XXXXXXXXX ........................');
							console.log(winner);
							res.json(winner);
							res.end();
						});

				});

		});


})


// function getVoteResults() {
// 	var voteCountGlobal = {};
// 	voteResultService(req.app).findAllVoteResults()
// 		.then(function(voteCount) {
// 			voteCountGlobal = voteCount;
// 		}).catch(function(err) {
// 			console.log(err);
// 		});
// 	return voteCountGlobal;
// }

module.exports = router;