var mongoose = require("mongoose");

var deductibleScehma = new mongoose.Schema({
    deductibleId: Number,
    definedAs:  {
        type: String,
        required: [true, 'Please add an definedAs']
      },
    deductibleValue: [{
        text: String,
        value: Number
    }],
    aggregateValue: {
        type: Number,
        required: [true, 'Please add an aggregateValue']
      },
    version: {
        type: Number,
        required: [true, 'Please add an version']
      }
})

const Deductible = mongoose.model("Deductible", deductibleScehma);

module.exports = Deductible;