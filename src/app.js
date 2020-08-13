const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const logger = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const deductiblesRoutes = require('./routes/deductibles-api');

const app = express();

app.use(logger('dev'));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

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

// HealthCheck route to be used by services that scan for uptime
app.use('/healthcheck', (req, res) => {
  res.status(200).send('HEALTH_CHECK_SUCCESS');
});

app.use('/api/v1/deductibles', deductiblesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`RESTful API server started on port ${PORT}`));
