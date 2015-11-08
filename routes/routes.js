var express = require('express');
var router = express.Router();
var passport = require('passport-google-oauth')
var ObjectId = require('mongodb').ObjectID

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

/*
 * GET Current listings.
 */
router.get('/listings/currentListings', function(req, res) {
    var db = req.db;
    var collection = db.collection('listings');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET User cart.
 */
router.get('/listings/cart', function(req, res) {
    if (req.user) {
      var db = req.db;
      var listing_collection = db.collection('listings');
      var userlist_collection = db.collection('userlist');
      console.log("getting cart for "+req.user.id)
      userlist_collection.findOne(
          {'id':req.user.id},
          function(e,docs){
              console.log("cart: "+docs['cart'])
              if (docs['cart']) {
                var ids = docs['cart'].map(function(id) { return ObjectId(id); });
                console.log("type ids: "+typeof(ids))
                console.log(ids)
                listing_collection.find(
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
  // TODO
    if (req.user) {
      var item = req.params.id;
      var itemId = ObjectId(itemId);
      var db = req.db;
      console.log ("add item to cart for user id: "+req.user.id)
      var userlist_collection = db.collection('userlist');
      // Check for duplicate
      userlist_collection.findOne(
          {'id':req.user.id},
          function(e,docs){
              console.log("cart: "+docs['cart'])
              if (docs['cart']) {
                var ids = docs['cart'].map(function(id) { return id; });
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
                userlist_collection.update(
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
      });
 
    }else{
      console.log ("No user found.")
    }
});

/*
 * POST to listings
 */
router.post('/postItem', function(req, res) {
    var db = req.db;
    var collection = db.collection('listings');
    console.log (req.body)
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
