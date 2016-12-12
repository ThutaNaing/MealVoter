var express = require('express'),
	passport = require('passport'),
	router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  // res.redirect('./login');
  res.render('login_page');
});

module.exports = router;
