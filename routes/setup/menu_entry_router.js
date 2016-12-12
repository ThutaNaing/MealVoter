var express = require('express'),
	router = express.Router(),
	menuEntryService = require('../../services/menu_entry_service');

router.get('/menu', function(req, res, next) {
	console.log(req.user);
	if(req.user.userRole === 'A') {
		res.render('menu_entry', { user: req.user });
	} else {
		res.end();
	}
});
router.post('/menu', function(req, res, next) {
	console.log('/menu post method work!');
	console.log(req.body);
	var persistedResult = menuEntryService(req.app).create(req.body);
	persistedResult.then(function(menuModel) {
		res.json(menuModel);
		res.end();
	});
});
router.post('/menuList', function(req, res, next) {
	console.log('/menuList post method work!');
	var menuListPromise = menuEntryService(req.app).retrieveAll();
	menuListPromise.then(function(menuList) {
		console.log(menuList);
		res.json(menuList);
		res.end();
	});
});

module.exports = router;
