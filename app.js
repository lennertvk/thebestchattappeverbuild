var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport =require('./passport/passport');


//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/api/v1/messages');
// mag de grbuiker de messages zien of niet?
//var messagesRouter = require('./api/v1/messages', passport.authenticate('jwt', { session: false }),apiMessagesRouter);


var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
try {
  mongoose.connect('mongodb+srv://chatapp:WalHy1jQayvq4ZRD@cluster0-t1v4z.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
} catch (error) {
  console.log(error);
}

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use (cors());

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

/*
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:N4rfhafs!@thebestchattappeverbuild-eambg.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri,{ useNewUrlParser: true } ,function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
*/



module.exports = app;
