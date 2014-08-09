var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var passport = require('passport');
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

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(passport.initialize());

// MODELS
// ==========================================================================================




// ROUTES FOR THE API
// ===========================================================================================
var clientRoutes = require('./routes');
var authController = require('./routes/auth');

//User
var userController = require('./routes/users');

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:id')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

// Projects
var projectController = require('./routes/projects');

router.route('/projects')
    .post(authController.isAuthenticated, projectController.postProjects)
    .get(authController.isAuthenticated, projectController.getProjects);

router.route('/projects/:id')
    .get(authController.isAuthenticated, projectController.getProject)
    .put(authController.isAuthenticated, projectController.putProject)
    .delete(authController.isAuthenticated, projectController.deleteProject);

// Blog posts
var postController = require('./routes/posts');

router.route('/posts')
    .post(authController.isAuthenticated, postController.postPost)
    .get(authController.isAuthenticated, postController.getPosts);

router.route('/posts/:id')
    .get(authController.isAuthenticated, postController.getPost)
    .put(authController.isAuthenticated, postController.putPost)
    .delete(authController.isAuthenticated, postController.deletePost);


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
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
    res.send('error', {
        message: err.message,
        error: {}
    });
});

router.get('/', function(req, res){
    res.json({message: 'There is nothing here to see'});
});

app.use('/api', router);
app.get('*', clientRoutes.client);
module.exports = app;

console.log('server listening on port 3000');