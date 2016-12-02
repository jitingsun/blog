var express = require("express");
var user = require("./routes/user");
var article = require("./routes/article");
var index = require("./routes/index");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore=require('connect-mongo')(session);
var path = require("path");
var config=require('./config');
global.inspect=require('util').inspect;
var app = express();
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.engine(".html", require("ejs").__express);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	resave: true,
	secret: "sun",
	saveUninitialized: true,
	cookie: {httpOnly: true},
	store:new MongoStore({
		url:config.dbUrl
	})
}));
app.use(function (req, res, next) {
	res.locals.success=req.session.success;
    res.locals.err=req.session.err;
    res.locals.user=req.session.user;
    req.session.err=req.session.success=null;
    next();
});
app.listen(8080);
app.use("/user", user);
app.use("/article", article);
app.use("/", index);
