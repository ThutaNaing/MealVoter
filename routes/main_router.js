var express = require('express'),
	router = express.Router(),
	index = require('./index'),
	menuEntryRouter = require('./setup/menu_entry_router'),
	restaurantEntryRouter = require('./setup/restaurant_entry_router'),
	pollVoteRouter = require('./voting/poll_vote_router'),
	voteResultRouter = require('./voting/vote_result_router');

module.exports = function(app) {
	app.use('/', index);
	app.use('/mealvoter', index);
	app.use('/mealvoter/setup', menuEntryRouter);
	app.use('/mealvoter/setup', restaurantEntryRouter);
	app.use('/mealvoter/poll', pollVoteRouter);
	app.use('/mealvoter/poll', voteResultRouter);
};