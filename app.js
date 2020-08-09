var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

const deductiblesRoutes = require("./routes/deductibles-api");

const app = express(),
  port = process.env.PORT || 3000;

  //mongodb+srv://pravin:elle73IgmaGAaE3P@cluster0.xuqex.mongodb.net/insurance-app?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://pravin:elle73IgmaGAaE3P@cluster0.xuqex.mongodb.net/insurance-app?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(() => {
    console.log('Connection failed');
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/deductibles", deductiblesRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    error: err.message
  })
});


app.listen(port);

console.log('RESTful API server started on: ' + port);