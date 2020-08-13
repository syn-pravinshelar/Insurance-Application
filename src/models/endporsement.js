var mongoose = require("mongoose");

var endorsementScehma = new mongoose.Schema({

    endorsementId : {
        type: mongoose.Schema.Types.Number,
        indexes : true
    },
    endorsementName : mongoose.Schema.Types.String,
    endorsementCode : mongoose.Schema.Types.String,
    lineOfBusiness : {type: mongoose.Schema.Types.ObjectId,ref:"LineOfBusiness"},
    jurisdiction :
    [{
        type:mongoose.Schema.Types.String,
        default:undefined
    }],
    effectiveDate : mongoose.Schema.Types.Date,
    expirationDate : mongoose.Schema.Types.Date,
    endorsementDescription : mongoose.Schema.Types.String,
    status : mongoose.Schema.Types.String,
    endorsementType : mongoose.Schema.Types.String,
    allowMultipleEndorsements : mongoose.Schema.Types.Boolean,
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

const Endorsement  = mongoose.model('Endorsement', endorsementScehma);

module.exports = Endorsement;
