/**
 * Created by Danny Schreiber on 8/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', User);