const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/db');

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

// Mount routers

// HealthCheck route to be used by services that scan for uptime
app.use('/healthcheck', (req, res) => {
  res.status(200).send('HEALTH_CHECK_SUCCESS');
});

//app.use('/api/v1/healthcheck', require('./controllers/v1/healthcheck'));

app.use('/api/v1/deductible', require('./routes/v1/deductible'));

/*
 * Default Error Handler
 */
// eslint-disable-next-line no-unused-vars
app.use(({ statusCode = 500, status = 'Error', message = '' }, req, res, next) => {
  res.status(statusCode).json({
    status,
    message,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'Failed',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`RESTful API server started on port ${PORT}`);
  connectDB().then(() => {
    console.log(`Connected to MongoDB`);
  });
});

/****
 *
 * `date=>${new Date()}\n method=>${req.method}nsender:${req.ip}`
 */
