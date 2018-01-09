var mongoose        = require("mongoose");

var Customer    = require("./models/customer");

function seedDB(){
    //Remove all campgrounds
    Customer.remove({}, function(err){
        if (err){
            console.log(err);
        }
    console.log("Customers removed!");
    });
}

module.exports = seedDB;
