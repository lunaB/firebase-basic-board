var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Initialize Firebase
var firebase = require('firebase');
var firebaseConfig = require('./firebase/firebase-config.json')
// json파일로 바꿔서 옮길때는 apiKey: -> "apiKey": 큰따옴표로 둘러줘야함.
//var firebaseConfig = {
//    apiKey: "00000",
//    authDomain: "00000",
//    databaseURL: "00000",
//    projectId: "00000",
//    storageBucket: "00000",
//    messagingSenderId: "00000",
//    appId: "00000",
//    measurementId: "00000"
//}
firebase.initializeApp(firebaseConfig);

// https://stackoverflow.com/questions/37403747/firebase-permission-denied
// Initialize Firebase Admin
var admin = require("firebase-admin");
var serviceAccount = require("./firebase/firebase-sdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://basic-board-a1bf6.firebaseio.com"
});

// 두개중에 하나는 주석해야함
// 1. 실시간 데이터베이스
// 2. Cloud Firestore
// 같이쓰려면 firebase global init 해주고 잡코드 수정해야함
//var board_realtime_db = require('./routes/board_realtime_db');
var board_firestore = require('./routes/board_firestore');
var board_auth = require('./routes/board_auth');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', board_realtime_db);
app.use('/', board_firestore);
app.use('/auth', board_auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
