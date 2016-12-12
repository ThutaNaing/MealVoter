var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mainRouter = require('./routes/main_router');
var models = require('./models/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secreate', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.set('models', models);
models.sequelize.sync();
// models.sequelize.sync({ force: true });

/*** Authentication codes ***/
var userAccService = require('./services/user_account_service');
var isSuccess =  false;
passport.use(new LocalStrategy(

  function(username, password, done) {
    userAccService(app).findByUsername(username).then(function(userAccModel) {

      if(!userAccModel) {
        isSuccess = false;
        return done(null, false);
      }
      if(userAccModel.userPassword !== password) {
        isSuccess = false;
        return done(null, false);
      }
      isSuccess = true;
      return done(null, userAccModel);

    });
  }

));
passport.serializeUser(function(userAccModel, done) {
  console.log(userAccModel);
  done(null, userAccModel);
});
passport.deserializeUser(function(userAccModel, done) {
    done(null, userAccModel);
});
app.get('/', function(req, res, next) {
  res.render('login_page');
});
app.post('/login',
  passport.authenticate('local', { successRedirect: '/mealvoter/poll/board',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.all("/*", function(req, res, next) {
  if(isSuccess) {
    next();
  } else {
    res.redirect("/");
  }
});
/*** Authentication codes ***/

/*** application routes ***/
mainRouter(app);

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

var currentDate = new Date();
console.log(currentDate);