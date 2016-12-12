module.exports = function(app){
	var Restaurant = app.get('models').restaurant,
		Menu = app.get('models').menu;
	return {
				create: function(restaurantModel) {
					var persistedResult = Restaurant.build(restaurantModel).save();
					persistedResult.catch(function(err) {
						console.log('Exception rising at restaurant creation service!');
						console.log(err);
					});
					return persistedResult;
				},
				update: function(restaurantModel) {
					var persistedResult = restaurantModel.update();
					persistedResult.catch(function(err) {
						console.log('Exception rising at restaurant updating service!');
						console.log(err);
					});
					return persistedResult;
				},
				findById: function(restaurantModel) {
					// return Restaurant.findById(restaurantModel.restaurantId);
					return Restaurant.findAll({
						where: { restaurantId: restaurantModel.restaurantId },
						include: [Menu]
					});
				},
				findAllWithMenuList: function() {
					return Restaurant.findAll({
						include: [Menu]
					});
				}
			};
};