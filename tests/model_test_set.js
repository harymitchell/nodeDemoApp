var userModel = require('../models/user').userModel
var mongoose = require('mongoose')

var url = 'mongodb://localhost:27017/nodeDemo';
var db = mongoose.connect(url, function (err, res){
    if (err) {
        console.log ('ERROR connecting to: ' + url + '.'+err);
    } else {
        console.log ('Connected to: ' + url);
    }
    // Tests.
    console.log ("starting tests")
    testUsers()
});

var testUsers = function(){
	// assignment
	var newUser = new userModel();
	 
	newUser.name = 'Chad'
	newUser.username = 'cc'
	newUser.email = 'cc@gmail'
	newUser.fullname =  'Chad Chad'
	newUser.age = '33'
	newUser.location = 'ATL'
	newUser.gender = 'M'
	newUser.cart = ["item", "item2"]

	newUser.save(function(err) {
		if (err) throw err;
		userModel.findOne({'name': 'Chad'}, {}, function(err, user) {
			if (err) throw err;
			console.log ("user: "+user)
			// purge
			newUser.remove(function(err,removed) {
			});
		});	
	});

	// inline json
	var newUser2 = new userModel({name:'Eddy'});
	newUser2.save(function(err) {
		if (err) throw err;
		userModel.findOne({'name': 'Eddy'}, {}, function(err, user) {
			if (err) throw err;
			console.log ("user: "+user)
			// purge
			newUser2.remove(function(err,removed) {
			});
		});	
	});

	// json variable
	var json = {
		name: 'jason',
		email: 'jason@gmail'
	}
	var newUser3 = new userModel(json);
	newUser3.save(function(err) {
		if (err) throw err;
		userModel.findOne({'name': 'jason'}, {}, function(err, user) {
			if (err) throw err;
			console.log ("user: "+user)
			// purge
			newUser3.remove(function(err,removed) {
			});
		});	
	});
}

var testItems = function(){

}