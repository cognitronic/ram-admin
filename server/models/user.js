/**
 * Created by Danny Schreiber on 8/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

User.pre('save', function(callback){
   var user = this;

    //return if password hasn't changed
    if(!user.isModified('password')){
        return callback();
    }

    //password changed so hash it
    bcrypt.genSalt(5, function(err, salt){
       if(err){
           return callback(err);
       }

        bcrypt.hash(user.password, salt, null, function(err, hash){
           if(err){
               return callback(err);
           }
            user.password = hash;
            callback();
        });
    });
});

User.methods.verifyPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, isMatch){
       if(err){
           return callback(err);
       }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('user', User);