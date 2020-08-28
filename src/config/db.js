const mongoose = require('mongoose');

// const connectDB = async () => {
//   return mongoose.connect('mongodb://mongo:27017/synechron', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// Mongo DB Atalas connection string-
// mongoose.connect('mongodb+srv://pravin:elle73IgmaGAaE3P@cluster0.xuqex.mongodb.net/insurance-app?retryWrites=true&w=majority', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//   })

const connectDB = async () => {
  return mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
