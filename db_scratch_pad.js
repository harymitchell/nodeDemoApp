var mongo = require('mongodb')
  , monk = require('monk')
  , db = monk('localhost:27017/nodeDemo')
    ObjectId = require('mongodb').ObjectID;
  

var userlist_collection = db.get('userlist');
var listing_collection = db.get('listings');

// update({'id':'3'}, {$push:{"cart": "BILLY!"}})
//userlist_collection.update(
//          {'id': '2'},
//          {
//            $push: {"cart": "Billlll"}
//          }, function(err, result){
//            console.log ("result:"+result)
//            process.exit()
//      });

userlist_collection.findOne(
    {'id':'112337690420630348455'},
    function(e,docs){
        console.log(docs['cart'])
        ids = docs['cart'].map(function(id) { return ObjectId(id); });
        console.log(ids)
        listing_collection.find(
            {_id: {$in:ids}},
            function(e, docs){
                console.log (docs)    
            });
});
//db.userlist.find({'id':'112337690420630348455'},{cart:1, _id:0})
//
//db.listings.find({_id: {$in:[ObjectId("563cc3ec6b5a6ce831448fd4")]}})