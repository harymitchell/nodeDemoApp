//DB create script

//To add test data manually from command line:
//From mongo root, run
//>mongod --dbpath [path-to-node-app]\data
//>mongo
//>use nodeDemo
//>db.userlist.insert({'username' : 'elee','email' : 'edlee@gmail.com','fullname' : 'Ed Lee','age' : 21,'location' : 'ATL','gender' : 'Male'})
//>db.listings.insert({'name' : 'sweet ride','type' : 'moped','price' : '$200 ','location' : 'ATL'})

// This script will add the data using node modules.
var mongo = require('mongodb')
  , monk = require('monk')
  , db = monk('localhost:27017/nodeDemo');

//
// Build test users
//
var userlist_collection = db.get('userlist');
userlist_collection.remove(function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
userlist_collection.insert({'username' : 'elee','email' : 'edlee@gmail.com','fullname' : 'Ed Lee','age' : 21,'location' : 'ATL','gender' : 'Male'}, function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
userlist_collection.insert({'username' : 'byoung','email' : 'byoung@gmail.com','fullname' : 'Bing Young','age' : 21,'location' : 'ATL','gender' : 'Male'}, function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
userlist_collection.insert({'username' : 'hmat','email' : 'hat@gmail.com','fullname' : 'Harold Mat','age' : 23,'location' : 'ATL','gender' : 'Male'}, function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
    process.exit()
});

//
// Build test listings
//
var listing_collection = db.get('listings');
listing_collection.remove(function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
listing_collection.insert({'name' : 'neon','type' : 'car','price' : '$1000', 'location' : 'ATL'}, function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
listing_collection.insert({'name' : 'sweet ride','type' : 'moped','price' : '$300', 'location' : 'Marietta'}, function(err, result){
    console.log(
        (err === null) ? { msg: '' } : { msg: err }
    );
});
