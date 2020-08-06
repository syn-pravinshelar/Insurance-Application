var mongoose = require("mongoose");

var deductibleScehma = new mongoose.Schema({
    deductibleId : mongoose.Schema.Types.Number,
    definedAs: mongoose.Schema.Types.String,
    deductibleValue : [{
        type: {
            text:mongoose.Schema.Types.String, 
            value:mongoose.Schema.Types.Number}
    }],
    aggregateValue : mongoose.Schema.Types.Number,
    version: mongoose.Schema.Types.Number
})

const Deductible = mongoose.model("Deductible",deductibleScehma);

module.exports = Deductible;