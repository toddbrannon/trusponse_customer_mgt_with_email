var express     = require("express");
var router      = express.Router();
var Customer    = require("../models/customer.js");


// INDEX ROUTE - show all customers
router.get("/", isLoggedIn, function(req, res){
    // Get all customers from DB
    Customer.find({}, function(err, allCustomers){
        if(err){
            console.log(err);
        } else {
            res.render("customers", {customers:allCustomers});
        }
    });
});

// CREATE ROUTE - add new customer to the DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to customers array
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var agreement_exp = req.body.agreement_exp;
    var newCustomer = {first_name: first_name, last_name: last_name, email: email, agreement_exp: agreement_exp};
    // Create a new customer and save to DB
    Customer.create(newCustomer, function (err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to customers page
            res.redirect("/");
        }
    });
});
// NEW ROUTE - show form to create new customer (GET for the "/new" route and if logged in, render the new.ejs file [template])
router.get("/new", isLoggedIn, function(req, res){
    res.render("new.ejs");
});


// SHOW ROUTE - shows more info about one customer (GET for the "/:id" route and if logged in, find the customer by id and render the show.ejs file [template])
router.get("/:id", isLoggedIn, function(req, res){
    //find the customer with provided ID
    Customer.findById(req.params.id, function(err, foundCustomer){
       if(err){
            console.log(err);
       } else {
            //render show template with that customer
            res.render("show", {customer: foundCustomer});
       }
    });
});

// EMAIL ROUTE - shows the email form to compose a new email
router.get("/:id/email", isLoggedIn, function(req, res){
    res.render("email");
});

// COMPOSE ROUTE - compose email in the email form
router.post("/email", isLoggedIn, function (req, res) {
    var transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'toddqbrannon@gmail.com',
            pass: '12RR0m@n50ld13r5'
        }
    });
    // get data from the email form
    var mailOptions = {
        from: '"Todd Brannon" <toddqbrannon@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };
    // send the email
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            return console.log(err);
        } else {
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render("/customers");
        }
    });
});

// Middleware ==================================================================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;