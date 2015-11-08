var express = require('express');
var router = express.Router();
var userModel = require('../models/user').userModel

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    console.log ("getting user list ")
    userModel.find({}, function(err, users) {
        if (err) console.log (err)
        console.log ("found users: "+users)
        res.send(users);
    });
});


/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    console.log ("adding user for: "+req.body)
    var newUser = new userModel(req.body);
    newUser.save(function(err) {
        if (err) console.log (err)
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.collection('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
