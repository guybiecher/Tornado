var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var log4js = require('log4js');
var loggerInfo = log4js.getLogger();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var parser = require('json-parser');
var mysql = require('mysql');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var www = require('./bin/www');
var rooms = www.rooms;
var session = require('express-session');




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



//use routers
// app.use('/', routes);
app.use('/users', users);

//use session cookie
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

//get and post request


app.get('/register', function (req, res) {
    res.sendfile(__dirname + '/public/register.html')
});

app.get('/login', function (req, res) {
    res.sendfile(__dirname + '/public/login.html')
})

app.get('/logout', function (req, res) {


    req.logout;
    req.session.destroy(function (err) {
        //console.log(req.session.toString())
        res.redirect('/login'); //Inside a callback… bulletproof!
    });
});
app.get('/account', function (req, res) {
        res.sendFile(__dirname + '/public/Account.html', '_self')

})

app.get('/translate', function (req, res) {
    res.sendfile(__dirname + '/public/translate.html')
})


app.post('/login', function (req, res) {
    checkUserOnDB(req, res, req.body.name, req.body.password, "login")
})

app.get('/settings', function (req, res) {
    console.log(req.session)
    res.sendfile(__dirname + '/public/settings.html')
})

app.get('/about', function (req, res) {
    res.sendfile(__dirname + '/public/about.html')
})
app.get('/home', function (req, res) {
    loggerInfo.info(req.session)

    if (typeof req.session.user != 'undifined') {
        console.log(req.session.user)
        var userSession = req.session.user
        var password = req.session.password

        checkUserOnDB(req, res, userSession, password, "home")

    } else {
        loggerInfo.info("User not login")
        res.redirect("/login")
    }
})

app.post('/updatelanguage', function (req, res) {
    var connection = createConnection()
    var user = req.session.user
    var language = req.body.language
    console.log(language)

    var query = 'UPDATE Users SET language = ? WHERE user = ?;'

    connection.query(query,[language , user],function (err ,rows ,fileds) {
        if (err) {
            loggerInfo.info(err.message)
            res.send("Cant get language")
        }
        else{
            loggerInfo.info("Language user select successfully")
            res.send(rows)
        }
    })
    connection.end();


})

app.post('/updateUser', function (req, res) {
    console.log("leh zdaien")//debug
    var connection = createConnection()
    var olduser = req.session.user
    var user = req.body.name
    var password = req.body.password

    var query = 'UPDATE Users SET user = ? , password = ? WHERE user = ?;'

    connection.query(query, [user, password, olduser], function (err, rows, fields) {
        if (err) {
            loggerInfo.info(err.message)
            res.send("Cant update user")
        }
        else {
            loggerInfo.info("Update successfully user")
            req.session.reset()
            req.session.user = user
            req.session.password = password
            res.send("User name and password updated")
        }

    })
    connection.end();

})

app.post('/register', function (req, res) {
    loggerInfo.info("User try to register")
    loggerInfo.info(req.body.name)
    loggerInfo.info(req.body.password)

    var name = req.body.name
    var passowrd = req.body.password
    var connection = createConnection()

    var post = {user: name, password: passowrd, language: "en"};
    connection.query('INSERT INTO Users SET ?', post, function (err, rows, fields) {
        if (!err) {
            loggerInfo.info('The solution is: ', rows);
            req.session.user = name;
            req.session.password = passowrd;
            res.sendfile(__dirname + '/public/index.html');

        }
        else {
            loggerInfo.info(err.message);
            res.statusCode = 400
            res.send("Error to create user " + err.message)
        }

    });

    connection.end();

});

app.get('/getMyName', function (req, res) {
    res.send(req.session.user);
})

app.post('/chat', function (req, res) {
    console.log('yyesss');
    console.log(req.body.user)//debug
    req.session.target = req.body.user;
});

app.get('/chat', function (req, res) {
    fs.readFile(__dirname + '/public/single_chat.html', function (err, data) {
        if(err) return res.status(500).send("Error");
        res.send(data.toString());
    });
});

app.get('/getTarget', function (req, res) {
    console.log('BLAT 1');
    console.log(req.session);
    console.log(req.session.target);
    console.log(Object.keys(rooms));
    if(typeof req.session.target != 'undefined'){
        if(req.session.target in rooms){
            console.log('BLAT 2');
            res.statusCode = 200;
            res.send(req.session.target);
        } else {
            console.log('BLAT 3');
            res.statusCode = 400;
            res.send('User is offline');
        }
    } else {
        res.send('Error getting target user');
    }
});


app.get('/session', function(req, res){
    if(typeof(req.session.user) !== 'undefined'){
        res.statusCode = 200;
        res.send(req.session.user);
    } else {
        res.statusCode = 400;
        res.send('Oops! Something went wrong. Please loguot and login again');
    }
});

app.get('/contacts', function(req, res){
    var connection = createConnection();
    connection.query('SELECT * FROM Users', function(err, rows){
        if(!err){
            res.statusCode = 200;
            for(var i in rows){
                rows[i].password = null;
            }
            res.send(rows);
        } else {
            res.statusCode = 400;
        }
    });
    connection.end();
});

//


//create connection to DB
function createConnection() {
    var connection = mysql.createConnection({
        host: 'sql7.freemysqlhosting.net',
        user: 'sql7132742',
        password: 'EaR8E1zFeW',
        database: 'sql7132742'
    });

    connection.connect();
    return connection
}

function checkUserOnDB(req, res, user, password, functionName) {

    var connection = createConnection()

    loggerInfo.info(user);
    loggerInfo.info(password);

    var query = 'SELECT password FROM Users WHERE user =  ? ';

    connection.query(query, [user], function (err, rows, fields) {
        if (!err) {

            if (typeof rows[0] != 'undefined') {
                loggerInfo.info("User login checking password ");
                if (password === rows[0].password) {
                    loggerInfo.info("User login by cookie password correct")
                    req.session.reset
                    req.session.user = user
                    req.session.password = password
                    if (functionName === "home") {
                        console.log("home")
                        res.redirect("/")
                    }
                    if (functionName === "login") {
                        console.log("login")
                        res.redirect("/")
                    }
                }
                else {
                    loggerInfo.info("Password is not correct")
                    res.sendFile(__dirname + '/public/login.html', '_self')
                }
            }
            else {
                loggerInfo.info("User name doesn't exitst")
                res.sendFile(__dirname + '/public/login.html', '_self')

            }
        }
        else {
            loggerInfo.info(err.message);
            res.send("Didn't login")

        }

    });
    connection.end();

}


module.exports = app;