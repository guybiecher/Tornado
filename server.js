
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());




var server = app.listen(3000,function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);

});