var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dateFormat = require('dateformat');

// firebase realtime 으로 구현
// https://firebase.google.com/docs/reference/js/firebase.database.Reference
var admin = require("firebase-admin");
var database = admin.database()


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/list')
});

// list
router.get('/list', function(req, res, next) {
    database.ref('posts').orderByKey().once('value', function(snapshot){
        var posts = []

        snapshot.forEach(function(s) {
            data = s.val()
            data.regdate = dateFormat(data.regdate,"yyyy-mm-dd");
            posts.push(data)
        })
        res.render('list', {posts: posts.reverse()});
    })
});

// post
router.get('/post/:id', function(req, res, next) {
    let id = req.params.id
    database.ref('posts/'+id).orderByKey().once('value', function(snapshot){
        var post = snapshot.val()
        post.regdate = dateFormat(post.regdate,"yyyy-mm-dd");
        
        res.render('post', {post: post});
    })
});

// write
router.get('/write', function(req, res, next) {
    res.render('write');
});
router.post('/write', function(req, res, next) {
    var post_key = database.ref().child('posts').push().key;
 
    var data = {
        b_id: post_key,
        writer: 'tester',
        title: req.body.title,
        content: req.body.content,
        regdate: Date.now()
    };
 
    database.ref('posts/'+post_key).set(data);
    res.redirect('post/'+post_key);
});


router.post('/test_case_post', function(req, res, next) {
    var post_key = database.ref().child('posts').push().key;
 
    var data = {
        b_id: post_key,
        writer:"나영채",
        title:"제목",
        content:"컨텐츠",
        regdate: Date.now()
    };
 
    database.ref('posts/'+post_key).set(data);
});

module.exports = router;
