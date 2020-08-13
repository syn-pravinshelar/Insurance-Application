var mongoose = require("mongoose");

var limitScehma = new mongoose.Schema({
 lineofbusiness: mongoose.Schema.Types.String
})

const LineOfBusiness = mongoose.model("LineOfBusiness",limitScehma);
module.exports = LineOfBusiness;