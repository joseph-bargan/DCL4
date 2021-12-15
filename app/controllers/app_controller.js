var path = require('path');

var mysql = require('mysql');
var x = 0;

var con = mysql.createConnection({
    host: "localhost",
    database: 'dcl1',
    user: "root",
    password: "Test123"
  });

con.connect(function(err) {
    if (err) throw err;
});

//Controller functions called on by the route script

exports.home= function(req,res){
    res.render('Login.html');
}

exports.inval= function(req,res){
    res.render('Login.html');
}

exports.login = function(req,res){

    console.log(req.body);
    var name = req.body.name;
    var pass = req.body.password;
    res.cookie('name', name);

    con.query("SELECT * FROM users WHERE name = '" + name + "' && " + "password = '" + pass + "'"
    ,  function (err, result, fields) {
      if (err) throw err;
      console.log(result.length);

      if (result.length > 0){
          res.cookie("invalidId",false);
        res.redirect('/profile');
      }

      else{
            res.cookie("invalidId", true);

            res.redirect('/invalid');
      }
      

    });

}

exports.signup = function(req,res){

    console.log(req.body);
    var name = req.body.name;
    var pass = req.body.password;
    var email = req.body.email;
    res.cookie('name', name);

    con.connect(function(err) {
        if (err) throw err;
        con.query("INSERT INTO users (name, password, email) VALUES ('" + name + "', '" + pass + "', '" + email + "')"
        , function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });

    res.redirect('/profile');
}

exports.profile= function(req,res){
    res.render('index.html');
}
