var userModel = require('../models/user').userModel
var itemModel = require('../models/item').itemModel
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
    // testUsers()
    testItems()
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

	// Owner
	var newUser = new userModel({
		name: 'jason',
		email: 'jason@gmail'	
	});
	newUser.save(function(err) {
		if (err) throw err;
		userModel.findOne({'name': 'jason'}, {}, function(err, user) {
			if (err) throw err;
			console.log ("user: "+user)
		});	
	});

	var json = {
		name: "neon",
		type:  "sedan",
		price: 1000,
		location: "ATL",
		ownerId: newUser._id
	}
	var newItem = new itemModel(json)
	newItem.save(function(err) {
		if (err) throw err;
		itemModel.findOne({'name': 'neon'}, {ownerId:1}, function(err, item) {
			if (err) throw err;
			console.log ("item: "+item)
		});	
	});

	// Owner
	var newUser2 = new userModel({
		name: 'rick',
		email: 'rickk@gmail',
		cart: [newItem._id]		
	});
	newUser2.save(function(err) {
		if (err) throw err;
		userModel.findOne({'name': 'rick'}, {}, function(err, user) {
			if (err) throw err;
			console.log ("user: "+user)
			newUser2.remove(function(err,removed) {
			});
			newItem.remove(function(err,removed) {
			});
			newUser.remove(function(err,removed) {
			});
		});	
	});


}