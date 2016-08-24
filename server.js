
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/chats', function(req,res){
    // TODO:send query to db for first 10 chats, insert by loob into <li> element and send back
    //client side function should trigger another request after injecting first 10 successfully
});

app.get('/contacts', function(req,res){
   // TODO:send query to db for first 10 contacts, insert by loob into <li> element and send back
    //client side function should trigger another request after injecting first 10 successfully
});


var server = app.listen(3000,function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);

});