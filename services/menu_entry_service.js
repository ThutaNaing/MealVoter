module.exports = function(app){
	var Menu = app.get('models').menu;
	return {
				create: function(menuModel) {
					var persistedResult = Menu.build(menuModel).save();
					persistedResult.catch(function(err) {
						console.log('Exception rising at menu creation service!');
						console.log(err);
					});
					return persistedResult;
				},
				retrieveAll: function() {
					return Menu.findAll({
						where: {
							restaurant_Id: null,
						}
					});
				},
				findById: function(menuModelId) {
					return Menu.findAll({
						where: { menuId: menuModelId }
					});
				}
			};
};