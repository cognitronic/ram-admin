/* GET users listing. */
//
//var express = require('express');
//var app = module.exports = express();
//
//app.get('/api/users', function(req, res){
//   res.send('list of users');
//});

var User = require('../server/models/user');


module.exports = function(app){
  app.post('/api/users', function(req, res){
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
  });

    app.get('/api/users', function(req, res){
        User.find({}).exec(function(err, users) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(users);
            }
        });
    });
};