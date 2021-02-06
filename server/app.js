var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const firebase = require("firebase");
const { graphqlHTTP } = require("express-graphql");

const config = {
  apiKey: "AIzaSyB8YgWXwzgMizIpHJokfQB3LMTXa5QO1ww",
  authDomain: "phonebook-wiki.firebaseapp.com",
  databaseURL: "https://phonebook-wiki-default-rtdb.firebaseio.com",
  projectId: "phonebook-wiki",
  storageBucket: "phonebook-wiki.appspot.com",
  messagingSenderId: "854931146722",
};
firebase.initializeApp(config);

var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/api', apiRouter);

const phonebookSchema = require('./graphql').phonebookSchema;
app.use('/graphql', cors(), graphqlHTTP({
    schema: phonebookSchema,
    rootValue: global,
    graphiql: true
}));

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
