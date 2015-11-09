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
    console.log ("attempting to delete user: "+req.params.id)
    userModel.find({'_id':req.params.id}).remove(
        function(e){
            if (e) console.log (e)
            res.send((e === null) ? { msg: '' } : { msg:'error: ' + e });
        });
});

module.exports = router;
