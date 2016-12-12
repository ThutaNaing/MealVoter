var express = require('express'),
	router = express.Router(),
	restaurantEntryService = require('../../services/restaurant_entry_service'),
	menuEntryService = require('../../services/menu_entry_service');

router.get('/restaurant', function(req, res, next) {
	if(req.user.userRole === 'A') {
		res.render('restaurant_entry', { user: req.user });
	} else {
		res.end();
	}
});
router.post('/restaurant', function(req, res, next) {
	console.log('/restaurant post method work!');
	console.log(req.body);
	var persistedResult = restaurantEntryService(req.app).create(req.body);
	persistedResult.then(function(restaurantModel) {
		res.json(restaurantModel);
		res.end();
	});
});
router.post('/restaurant/:menu_id', function(req, res, next) {
	console.log('/restaurant/:menu_id post method work! '+req.params.menu_id);
	var restaurantPromiseVal = restaurantEntryService(req.app).findById(req.body);
	restaurantPromiseVal.then(function(restaurantModel) {

		console.log(restaurantModel);
		restaurantModel.forEach(function(restModel) {
			console.log('-------------------------');
			restModel.addMenu(req.params.menu_id).then(function(rest) {
				console.log(rest);
			});
		});

	});
	res.end();
});

module.exports = router;