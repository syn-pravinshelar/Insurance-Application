const mongoose = require('mongoose');

const connectDB = async () => {
  return mongoose.connect('mongodb://mongo:27017/synechron', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
