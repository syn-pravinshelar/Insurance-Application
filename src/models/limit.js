const mongoose = require('mongoose');

const limitScehma = new mongoose.Schema({
  //limitId: Number,
  limitType: {
    type: String,
    required: [true, 'Please add an limitType']
  },
  limitValueType: {
    type: String,
    required: [true, 'Please add an limitValueType']
  },
  limitValue: [{
    text: String,
    value: Number
  }],
  version: {
    type: Number,
    required: [true, 'Please add an version']
  }
}, {
  versionKey: false
});

const Limit = mongoose.model('Limit', limitScehma);
module.exports = Limit;