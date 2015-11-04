var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'E-Shoppe' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'E-Shoppe Login' });
});

/* GET listings page. */
router.get('/listings', function(req, res, next) {
  res.render('listings', { title: 'E-Shoppe Listings' });
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
router.post('/listings/addListingToCart/:id', function(req, res) {
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

module.exports = router;
