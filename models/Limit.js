var mongoose = require("mongoose");

var limitScehma = new mongoose.Schema({
    limitId : mongoose.Schema.Types.Number,
    limitType : mongoose.Schema.Types.String,
    limitValueType : mongoose.Schema.Types.String,
    limitValue : [{
        type: {
            text:mongoose.Schema.Types.String, 
            value:mongoose.Schema.Types.Number}
    }],
    version : mongoose.Schema.Types.Number

});

const Limit = mongoose.model("Limit",limitScehma);
module.exports = Limit;