var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parser = require('json-parser');
var mysql = require('mysql');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/register', function (req, res) {
    res.sendfile(__dirname + '/public/register.html')
})

app.post('/register', function (req, res) {
    console.log("dadaadad")
    console.log(req.body.name)
    console.log(req.body.password)

    var name = req.body.name
    var passowrd = req.body.password


    var connection = mysql.createConnection({
        host: 'sql7.freemysqlhosting.net',
        user: 'sql7132742',
        password: 'EaR8E1zFeW',
        database: 'sql7132742'
    });

    connection.connect();
    var post = {user: name, password: passowrd};
    connection.query('INSERT INTO Users SET ?', post, function (err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            res.sendfile(__dirname + '/public/login.html')
        }
        else{
            console.log(err.message);
            res.statusCode = 400
            res.send("Error to create user " + err.message)
        }

    });

    connection.end();

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
