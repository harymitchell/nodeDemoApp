var express = require('express');
var router = express.Router();
var passport = require('passport-google-oauth');

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
    var collection = db.get('listings');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to user cart.
 */
router.post('/listings/postItemToCart/:id', function(req, res) {
  // TODO
    var item = req.params.id;
    console.log ("todo: add item to cart:"+item)
    var db = req.db;
    var collection = db.get('userlist');
    //collection.insert(req.body, function(err, result){
    //    res.send(
    //        (err === null) ? { msg: '' } : { msg: err }
    //    );
    //});
});

/*
 * POST to listings
 */
router.post('/postItem', function(req, res) {
    var db = req.db;
    var collection = db.get('listings');
    console.log (req.body)
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
