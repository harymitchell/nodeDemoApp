//DB create script

//To add test data manually from command line:
//From mongo root, run
//>mongod --dbpath [path-to-node-app]\data
//>mongo
//>use nodeDemo
//>db.userlist.insert({'username' : 'elee','email' : 'edlee@gmail.com','fullname' : 'Ed Lee','age' : 21,'location' : 'ATL','gender' : 'Male'})
//>db.listings.insert({'name' : 'sweet ride','type' : 'moped','price' : '$200 ','location' : 'ATL'})

// This script will add the data using node modules.
//var mongo = require('mongodb')
//  , monk = require('monk')
//  , db = monk('localhost:27017/nodeDemo');

var mongo = require('mongodb')
  , MongoClient = mongo.MongoClient
  , assert = require('assert');
//  , db = monk('mongodb://ds051524.mongolab.com:51524/heroku_45vvw6fm');
var db;

var url = 'mongodb://localhost:27017/nodeDemo';
MongoClient.connect(url, function(err, db) {
  db = db 
  assert.equal(null, err);
  console.log("Connected correctly to server.");

    //
    // Build test users
    //
    var userlist_collection = db.collection('userlist');
    userlist_collection.remove(function(err, result){
        console.log(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    userlist_collection.insert({'id':'1','username' : 'elee','email' : 'edlee@gmail.com','fullname' : 'Ed Lee','age' : 21,'location' : 'ATL','gender' : 'Male'}, function(err, result){
        console.log(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    userlist_collection.insert({'id':'2','username' : 'byoung','email' : 'byoung@gmail.com','fullname' : 'Bing Young','age' : 21,'location' : 'ATL','gender' : 'Male'}, function(err, result){
        console.log(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    userlist_collection.insert({'id':'3','username' : 'hmat','email' : 'hat@gmail.com','fullname' : 'Harold Mat','age' : 23,'location' : 'ATL','gender' : 'Male'}, function(err, result){
        console.log(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    userlist_collection.update(
              {'id': '3'},
              {
                $set: {"userame": "BILLY!"},
                upsert: true
              }, function(err, result){
                console.log ("result:"+result)
          });  

    //
    // Build test listings
    //
    var listing_collection = db.collection('listings');
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
        userlist_collection.find().toArray(function(e,docs){
            console.log("docs: "+docs);
            process.exit()
        }); 
    });
});
