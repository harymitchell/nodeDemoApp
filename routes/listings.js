var express = require('express');
var router = express.Router();

/* GET listings page. */
router.get('/listings', function(req, res, next) {
  res.render('listings', { title: 'E-Shoppe Listings' });
});

module.exports = router;
