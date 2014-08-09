/**
 * Created by Danny Schreiber on 8/9/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    title: String,
    subtitle: String,
    projectdate: {type: Date, default: Date.now},
    skills: String,
    description: String,
    imagepaths: [String]

});

module.exports = mongoose.model('project', Project);