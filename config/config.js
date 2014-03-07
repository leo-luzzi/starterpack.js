var path 	= require('path'),
express 	= require('express'),
hbs 		= require("hbs"),
fs		    = require('fs'),
passport	= require('passport');

var configureSSL = function(app) {
	app.ssl = {
	  key: fs.readFileSync(__dirname + '/ssl/privatekey.pem').toString(),
	  cert: fs.readFileSync(__dirname + '/ssl/certificate.pem').toString()
	};
};

exports.configure = function (app) {
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/../public/views/');
	app.configure(function() {
		app.use(express.static(__dirname + '/../public/'));
		app.use(express.json());
		app.use(function(req, res, next) {
		  console.log('handling request for: ' + req.url);
		  next();
		});
		app.use(express.urlencoded());
		app.use(express.cookieParser('fdk;133jna;l12jj3k'));
	    app.use(express.session({ secret: '3j143kl2;7poih;jkl;' }));
		app.use(passport.initialize());
		app.use(passport.session());
	});
	// Configurations
	configureSSL(app);
};
