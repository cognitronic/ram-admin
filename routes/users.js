/* GET users listing. */


var User = require('../server/models/user');


// save user
exports.postUsers = function(req, res){
    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'User created!: ', data: user});
    });
};

// get all users
exports.getUsers = function(req, res){
    User.find({}).exec(function(err, users) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(users);
        }
    });
};

// find user by id
exports.getUser = function(req, res){
    User.findById(req.params.id).exec(function(err, user) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(user);
        }
    });
};

// update user by id
exports.putUser = function(req, res){
    User.findById(req.params.id).exec(function(err, user) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function(err){
                if(err){
                    res.send(err);
                }
            });

            res.json(user);
        }
    });
};

// delete user by id
exports.deleteUser = function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'User deleted'});
    });
};


//module.exports = function(app){
//
//  // Save user
//  app.post('/api/users', function(req, res){
//     var user = new User();
//      user.firstname = req.body.firstname;
//      user.lastname = req.body.lastname;
//      user.email = req.body.email;
//      user.password = req.body.password;
//
//      user.save(function(err){
//            if(err){
//                res.send(err);
//            }
//          res.json({message: 'User created!: ', data: user});
//      });
//  });
//
//    //Find all
//    app.get('/api/users', function(req, res){
//        User.find({}).exec(function(err, users) {
//            if (err) {
//                res.render('error', {
//                    status: 500
//                });
//            } else {
//                res.json(users);
//            }
//        });
//    });
//
//    // Find by id
//    app.get('/api/users/:id', function(req, res){
//        User.findById(req.params.id).exec(function(err, user) {
//            if (err) {
//                res.render('error', {
//                    status: 500
//                });
//            } else {
//                res.json(user);
//            }
//        });
//    });
//
//    // Update by id
//    app.put('/api/users/:id', function(req, res){
//        User.findById(req.params.id).exec(function(err, user) {
//            if (err) {
//                res.render('error', {
//                    status: 500
//                });
//            } else {
//                user.firstname = req.body.firstname;
//                user.lastname = req.body.lastname;
//                user.email = req.body.email;
//                user.password = req.body.password;
//
//                user.save(function(err){
//                    if(err){
//                        res.send(err);
//                    }
//                });
//
//                res.json(user);
//            }
//        });
//    });
//
//    app.delete('/api/users/:id', function(req, res){
//       User.findByIdAndRemove(req.params.id, function(err){
//           if(err){
//               res.send(err);
//           }
//           res.json({message: 'User deleted'});
//       });
//    });
//};