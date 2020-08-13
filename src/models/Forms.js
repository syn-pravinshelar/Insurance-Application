var mongoose = require("mongoose");

var formsScehma = new mongoose.Schema({
    formId : mongoose.Schema.Types.Number,
    formNumber : mongoose.Schema.Types.String,
    formName : mongoose.Schema.Types.String,
    lineOfBusiness : {type: mongoose.Schema.Types.ObjectId,ref:"LineOfBusiness"},
    jurisdiction :
    [{
        type:mongoose.Schema.Types.String,
        default:undefined
    }],
    effectiveDate : mongoose.Schema.Types.Date,
    expirationDate : mongoose.Schema.Types.Date,
    formDescription : mongoose.Schema.Types.String,
    formType : mongoose.Schema.Types.String,
    requireRefiling : mongoose.Schema.Types.Boolean,
    status : mongoose.Schema.Types.String,
    version : mongoose.Schema.Types.Number
});

const Forms = mongoose.model("Forms",limitScehma);
module.exports = Forms;