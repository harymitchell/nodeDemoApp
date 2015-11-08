var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var session      = require('express-session');
// Database
var mongoose = require('mongoose')
var mongo = require('mongodb')
  , MongoClient = mongo.MongoClient
  , assert = require('assert');
  
var remote_uri = 'mongodb://test1:test1@ds051524.mongolab.com:51524/heroku_45vvw6fm'
var url = 'mongodb://localhost:27017/nodeDemo';
var url = remote_uri
var db = mongoose.connect(url, function (err, res){
    if (err) {
        console.log ('ERROR connecting to: ' + url + '.'+err);
    } else {
        console.log ('Connected to: ' + url);
    }
});
// Models
var userModel = require('./models/user').userModel
var itemModel = require('./models/item').itemModel

// OAuth
var passport = require('passport')
  , util = require('util')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// API creds
var GOOGLE_CLIENT_ID = "152913623600-ltm03tnr3pfm7ckm2tnnqm6aroe469gl.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "xhwNAW_-kvOO6YABcFcUY7tA";
// Passport serialization
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var routes = require('./routes/routes');
var users = require('./routes/users');

var app = express();

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(session({ secret: 'shazaam',
                  resave: 'false',
                  saveUninitialized: 'false' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log ("is authenticated req: "+req.isAuthenticated())
    console.log ("user: "+ req.user)
    if (req.isAuthenticated() || req.user) {
      console.log ("id: "+req.user.id)
      console.log ("user: "+JSON.stringify(req.user))
      userModel.findOne({
          "id": String(req.user.id)}, 
          function (err, o) {
            if (err) {
              console.log (err)
            }else{
              if (o){
                console.log ("found: "+o)
              }else{
                console.log ("adding new user")
                var newUser = new userModel({
                  'id': String(req.user.id),
                  'username': req.user.displayName,
                  'email' : "",
                  'fullname' : req.user.name.formatted,
                  'gender' : req.u
                })
                newUser.save(function(err) {
                  if (err) console.log (err)
                });
               }                    
              }
          });
    }
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  console.log ("logout req: "+req)
  req.logout();
  res.redirect('/');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  console.log ("is authenticate req: "+req)
  console.log("authenticated: "+ req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
