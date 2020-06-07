var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dateFormat = require('dateformat');

var admin = require("firebase-admin");
var database = admin.firestore()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/auth/')
});

// auth
router.get('/login', function(req, res, next) {
    admin.auth().getUserByEmail(req.body.email).then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch(function(error) {
        console.log('Error fetching user data:', error);
    });
    res.render('login');
});



module.exports = router;
