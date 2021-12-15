'use strict';
var express = require('express');
var port = process.env.PORT || 3000;
const app = express();
const cookierParser = require('cookie-parser')
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var session = require('express-session');
var path = require('path');

var mysql = require('mysql');

const ngrok = require('ngrok');

var mongoose = require('mongoose');

//Configurations
app.set('views', './app/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookierParser())

app.locals.mongoose = mongoose;

var routes = require('./app/routes/app_routes'); //importing routes
routes(app); //telling app the use these routes

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test123"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

console.log("TEST");

app.listen(port, (err) => {

    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${port}`);

});


