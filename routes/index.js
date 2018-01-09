var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route===================================================================
router.get("/", function(req, res){
    res.render("landing");
});

//==============================================================================
// AUTH ROUTES
//==============================================================================
// Show signup/register form ============================================================
router.get("/register", function(req, res){
    res.render("register");
});

// Handling user sign up =======================================================
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    req.body.password;
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/customers");
        });
    });
});

//==============================================================================

//====================== LOGIN + LOGOUT ROUTES =================================

// Render login form ===========================================================
router.get("/login", function(req, res){
    res.render("login");
});

// Login logic =================================================================
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/customers",
        failureRedirect: "/login"
    }), function(req, res){
});

//==============================================================================

// Logout route ================================================================
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// Middleware ==================================================================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;