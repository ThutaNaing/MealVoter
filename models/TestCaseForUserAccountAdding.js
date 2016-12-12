/*var UserAccount = require('./user_account');
var Restaurant = require('./restaurant');
var Menu = require('./menu');

UserAccount.sync({ force: true }).then(function() {
	UserAccount.create(
		{
			userAccountName: 'Jack',
			userPassword: 'P@ssw0rd',
			userRole: 'A'
		}).then(function(userAcc) {
			console.log(userAcc.userAccountName);
			console.log(userAcc.userPassword);
			console.log(userAcc.userRole);
		}
	);
});

Restaurant.sync({ force: true }).then(function() {
	var menu01 =Menu.create(
		{
			menuName: 'Myanmar Chicken Curry',
			price: 3500,
			code: 'MN-1',
			description: ''
		}
	);
	var menu02 =Menu.create(
		{
			menuName: 'Myanmar Red Pork Curry',
			price: 5000,
			code: 'MN-2',
			description: ''
		}
	);
	Restaurant.create(
		{
			restaurantName: 'Shwe Lat Yar',
			place: 'No(73) 5-2/Mayangone Tps/Yangon',
			phNo: '09-356278254'
		}).then(function(restaurant) {
			menu01.then(function(me01) {
				restaurant.addMenu(me01);
			});
			console.log(restaurant.restaurantName);
			console.log(restaurant.place);
			console.log(restaurant.phNo);
		}
	);
});
*/

var models = require('./index');
var dbContext = models.sequelize.sync();

/*** at userRole filling 'A' for admin role and filling 'U' for user role. ***/
dbContext.then(function() {
	var UserAccount = models.user_account;
	UserAccount.create(
		{
			userAccountName: 'Kelvin',
			userPassword: 'P@ssw0rd',
			userRole: 'U'
		}).then(function(userAcc) {
			console.log(userAcc.userAccountName);
			console.log(userAcc.userPassword);
			console.log(userAcc.userRole);
		}
	);
});
