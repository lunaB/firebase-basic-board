var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dateFormat = require('dateformat');

// firestore을 이용하여 구현
// https://firebase.google.com/docs/reference/js/firebase.database.Reference
var admin = require("firebase-admin");
var database = admin.firestore();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/list')
});

// list
router.get('/list', function(req, res, next) {
    database.collection('posts').orderBy('regdate').get().then((snapshot) => {
        var posts = []
        snapshot.forEach((doc) => {
            data = doc.data()
            data.b_id = doc.id
            console.log(data)
            data.regdate = dateFormat(data.regdate,"yyyy-mm-dd");
            posts.push(data)
        });
        res.render('list', {posts: posts.reverse()});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
});

// post
router.get('/post/:id', function(req, res, next) {
    let id = req.params.id
    database.collection('posts').doc(id).get().then(doc => {
        var post = doc.data()
        post.b_id = doc.id
        post.regdate = dateFormat(post.regdate,"yyyy-mm-dd");
        console.log(doc)
        res.render('post', {post: post});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
});

// write
router.get('/write', function(req, res, next) {
    res.render('write');
});
router.post('/write',function(req,res,next){
    database.collection('posts').add({
        writer: 'tester',
        title: req.body.title,
        content: req.body.content,
        regdate: Date.now()
    });
    
    res.redirect('/list');
});


module.exports = router;
