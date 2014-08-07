var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./config/db');
var mongoose = require('mongoose');
mongoose.connect(db.url + '/' + db.database, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + db.url + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + db.url);
    }
});
mongoose.set('debug', true);
var app = express();
var router = express.Router();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

// MODELS
// ==========================================================================================




// ROUTES FOR THE API
// ===========================================================================================


var routes = require('./routes');
require('./routes/users')(app);
require('./routes/projects')(app);
require('./routes/blog')(app);

/// catch 404 and forwarding to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (router.get('env') === 'development') {
    router.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

router.get('/', function(req, res){
    res.json({message: 'There is nothing here to see'});
});


app.get('*', routes.client);
module.exports = app;

console.log('server listening on port 3000');