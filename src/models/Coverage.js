var mongoose = require("mongoose");

var coverageScehma = new mongoose.Schema({

    coverageId : {
        type: mongoose.Schema.Types.Number,
        indexes : true
    },
    coverageName : mongoose.Schema.Types.String,
    coverageCode : mongoose.Schema.Types.String,
    lineOfBusiness : {type: mongoose.Schema.Types.ObjectId,ref:"LineOfBusiness"},
    jurisdiction :
    [{
        type:mongoose.Schema.Types.String,
        default:undefined
    }],
    effectiveDate : mongoose.Schema.Types.Date,
    expirationDate : mongoose.Schema.Types.Date,
    coverageDescription : mongoose.Schema.Types.String,
    status : mongoose.Schema.Types.String,
    coverageType : mongoose.Schema.Types.String,
    limits : [{
        type: mongoose.Schema.Types.ObjectId,
        default: undefined,
        ref : "Limit"
    }],
    deductibles : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Deductible"
    },
    version : mongoose.Schema.Types.Number
})

const Coverage  = mongoose.model('Coverage', coverageScehma);

module.exports = Coverage;
