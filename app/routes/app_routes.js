'use strict';
module.exports = function (app) {
    const index = require("../controllers/app_controller");

    //URL routes

    app.get('/', index.home);

    app.get('/invalid', index.inval);

    app.post('/login', index.login);

    app.post('/signup', index.signup);

    app.get('/profile', index.profile);

};