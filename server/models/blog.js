/**
 * Created by Danny Schreiber on 8/9/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
    title: String,
    author: String,
    body: String,
    preview: String,
    datecreated: {type: Date, default: Date.now},
    imagepath: String,
    tags: [String],
    comments: [{name: String, body: String, email: String, datecreated: {type: Date, default: Date.now}}],
    isactive: Boolean

});

module.exports = mongoose.model('blog', Blog);