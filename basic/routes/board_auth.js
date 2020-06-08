var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

var firebase = require("firebase");
var admin = require("firebase-admin");
var database = admin.firestore()


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/auth/user')
});

// mypage
router.get('/user', function(req, res, next) {
    let user = firebase.auth().currentUser
    // name, email, photoUrl, uid, emailVerified
    
    if(user){
        res.render('user', {user: user})
    }else{
        res.render('login')   
    }
});

// login
router.get('/login', function(req, res, next) {
    res.render('login')
});

router.post('/login', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user)
        res.redirect('/auth/user')
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        // ...
    });
});

// register 
router.get('/register', function(req, res, next) {
    res.render('register')
});

router.post('/register', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        res.redirect('/auth/user')
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        // ...
    });
});

// logout
router.get('/logout', function(req, res, next) {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        res.redirect('/auth/user')
    }).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message;screenX
        console.log(errorCode)
    });
});


module.exports = router;
