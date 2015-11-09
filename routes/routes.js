var express = require('express');
var router = express.Router();
var passport = require('passport-google-oauth')
var ObjectId = require('mongodb').ObjectID
var userModel = require('../models/user').userModel
var itemModel = require('../models/item').itemModel

/* GET home page. */
router.get('/', function(req, res, next) {
  //if (req.user) {
  //  console.log (req.user)
  //  console.log ("image "+req.user._json.image.url)
  //}
  res.render('index', { title: 'E-Shoppe Welcome', user: req.user });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'E-Shoppe Login' });
});

/* GET listings page. */
router.get('/listings', function(req, res, next) {
  res.render('listings', { title: 'E-Shoppe Listings' });
});

/* GET postItem page. */
router.get('/postItem', function(req, res, next) {
  res.render('postItem', { title: 'E-Shoppe Add New Listing' });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'E-Shoppe Admin' });
});

/* GET chat page. */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'E-Shoppe Chat' });
});

/*
 * GET Current listings.
 */
router.get('/listings/currentListings', function(req, res) {
    console.log ("getting current items ")
    itemModel.find({}, function(err, items) {
        if (err) console.log (err)
        console.log ("found items: "+items)
        res.send(items);
    });
});


/*
 * GET User cart.
 */
router.get('/listings/cart', function(req, res) {
    if (req.user) {

      console.log("getting cart for "+req.user.id)
      userModel.findOne(
          {'id':req.user.id},
          function(e,docs){
              if (docs['cart']) {
                console.log("cart: " + docs['cart'])
                var ids = docs['cart']//.map(function(id) { return ObjectId(id); });
                console.log("type ids: "+typeof(ids))
                console.log(ids)
                itemModel.find(
                    {_id: {$in:ids}},
                    function(e, docs){
                        console.log (docs) 
                        res.json(docs);   
                    });
               }
             });
    }else{
      console.log ("No user found.")
    }
});

/*
 * POST to user cart.
 */
router.post('/listings/postItemToCart/:id', function(req, res) {
    if (req.user) {
      var item = req.params.id;
      var itemId = ObjectId(itemId);
      var db = req.db;
      console.log ("add item to cart for user id: "+req.user.id)
      // Check for duplicate
      userModel.findOne(
          {'id':req.user.id},
          function(e,doc){
              if (doc['cart']) {
                console.log("cart: "+doc['cart'])
                var ids = doc['cart'].map(function(id) { return String(id); });
                var item_in_ids = false;
                for (i in ids){
                  if (ids[i] === item) {
                    item_in_ids = true
                    break;
                  }
                }
                if (item_in_ids) {
                  console.log ("item already in cart")
                }
              }
              if (!item_in_ids){
                console.log ("adding item to cart!")
                userModel.update(
                      {'id': req.user.id},
                      {
                        $push: {"cart": item}
                      }, function(err, result){
                        console.log ("err: "+err)
                        console.log ("result: "+result)
                  });
              }else{
                res.send ({ msg: "This item was already in your cart!"})
              }
          }
      );
 
    }else{
      console.log ("No user found.")
    }
});

/*
 * POST to listings
 */
router.post('/postItem', function(req, res) {
    console.log ("adding item to listings: "+req.body)
    var newItem = new itemModel(req.body);
    if (req.user) {
      console.log ("retrieving user for id "+req.user.id)
      userModel.findOne(
        {'id':req.user.id},
        function(e,doc){
          console.log ("new item will belong to: "+doc._id)
          newItem.ownerId = doc._id
          saveItemAndRespond(newItem, res)
        });
    }else{
      console.log ("anon add item")
      saveItemAndRespond(newItem, res)
    }
});


saveItemAndRespond = function(item, res){
    // Saves item and sends res as a response.
    console.log("in saveItemAndRespond")
    item.save(function(err) {
      if (err) console.log (err)
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  };

// TODO:  does this belong here?
currentUser = function(user){
  if (user){
    console.log("looking for user for id: "+user.id)
    userModel.findOne(
      {'id':user.id},
      function(e,doc){
        console.log("found user: "+doc)
        return doc
      });
  }else{
    console.log ("'currentUser': no user logged in.")
  }
}

module.exports = router;