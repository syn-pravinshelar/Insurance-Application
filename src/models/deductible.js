const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  deductibleId: Number,
  definedAs: {
    type: String,
    required: [true, 'Please add an definedAs'],
  },
  deductibleValue: [
    {
      text: String,
      value: Number,
    },
  ],
  aggregateValue: {
    type: Number,
    required: [true, 'Please add an aggregateValue'],
  },
  version: {
    type: Number,
    required: [true, 'Please add an version'],
  },
});

const Deductible = mongoose.model('Deductible', schema);

module.exports = Deductible;
