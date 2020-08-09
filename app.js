var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const deductiblesRoutes = require("./routes/deductibles-api");

const app = express();

app.use(logger('dev'));

// Body parser
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


// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   //res.render('error');
//   res.json({
//     error: err.message
//   })
// });


// Mount routers
app.use("/api/v1/deductibles", deductiblesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT, 
  console.log(
    `RESTful API server started on port ${PORT}`
  )
);
