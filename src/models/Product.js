var mongoose = require("mongoose");

var productScehma = new mongoose.Schema({
    productId : mongoose.Schema.Types.Number,
    productName : mongoose.Schema.Types.String,
    lineOfBusiness : {type: mongoose.Schema.Types.ObjectId,ref:"LineOfBusiness"},
    jurisdiction :
    [{
        type:mongoose.Schema.Types.String,
        default:undefined
    }],
    effectiveDate : mongoose.Schema.Types.Date,
    expirationDate : mongoose.Schema.Types.Date,
    productDescription : mongoose.Schema.Types.String,
    status : mongoose.Schema.Types.String,
    associatedForms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Forms"
    }],
    coverages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Coverage"
    }],
    endorsements:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Endorsement"
    }],
    version : mongoose.Schema.Types.Number
})

const Product = mongoose.model("Product",productScehma);
module.exports = Product;