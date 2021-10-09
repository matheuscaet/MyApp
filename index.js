const express = require("express");
const app = express();
const handlebars  = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const patch = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const {eAuthentic} = require("./helper/eAuthentic");
const cors = require("cors");


const passport = require("passport");
require("./config/auth")(passport);

//Config Session
app.use(session({
    secret:"myappsecret20092021",
    resave: true,
    saveUninitialized: true
}))

app.use(cors());

//Config Password
app.use(passport.initialize());
app.use(passport.session());


//Config flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Config bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Config handlebars
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Public 
app.use(express.static(patch.join(__dirname, "public")));

//Routes
app.use("/", routes);

//Enable Service 
app.listen(8081, function(){
    console.log("Service running.");
});