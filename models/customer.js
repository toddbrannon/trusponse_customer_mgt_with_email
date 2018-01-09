var mongoose        = require("mongoose");

// SCHEMA SETUP
var customerSchema  = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    agreement_exp: String
 });

var Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;