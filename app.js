var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
//    nodeMailer              = require("nodemailer");
    seedDB                  = require("./seeds");
    
seedDB();
    
// Requiring Routes ============================================================
var customersRoutes         = require("./routes/customers"),
    indexRoutes             = require("./routes/index");
    
// Load Keys ===================================================================
const keys = require('./config/keys');    
    
// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect ============================================================

//mongoose.connect("mongodb://localhost/trusponse_notify");

mongoose.connect(keys.mongoURI, {
    useMongoClient: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//==============================================================================
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//==============================================================================
// PASSPORT CONFIGURATION
//==============================================================================
app.use(require("express-session")({
    secret: "The four horsemen of the apocolypse cometh!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})
//==============================================================================
app.get("/", function(req, res){
    res.render("landing");
});

//==============================================================================

app.use(indexRoutes);
app.use("/customers", customersRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Trusponse Notify server has started...");
});