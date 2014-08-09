/**
 * Created by Danny Schreiber on 8/6/14.
 */

var Post = require('../server/models/post');

// save post
exports.postPost = function(req, res){
    var post = new Post();
    post.title = req.body.title;
    post.author = req.body.author;
    post.body = req.body.body;
    post.preview = req.body.preview;
    post.datecreated = req.body.datecreated;
    post.imagepath = req.body.imagepath;
    post.isactive = req.body.isactive;
    post.comments = req.body.comments;
    post.tags = req.body.tags;

    post.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'post created!: ', data: post});
    });
};

// find all
exports.getPosts = function(req, res){
    Post.find({}).exec(function(err, posts) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(posts);
        }
    });
};

// find by id
exports.getPost = function(req, res){
    Post.findById(req.params.id).exec(function(err, post) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(post);
        }
    });
};

// update by id
exports.putPost = function(req, res){
    Post.findById(req.params.id).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            post.title = req.body.title;
            post.author = req.body.author;
            post.body = req.body.body;
            post.preview = req.body.preview;
            post.datecreated = req.body.datecreated;
            post.imagepath = req.body.imagepath;
            post.isactive = req.body.isactive;
            post.comments = req.body.comments;
            post.tags = req.body.tags;

            post.save(function(err){
                if(err){
                    res.send(err);
                }
            });

            res.json(post);
        }
    });
};

// delete by id
exports.deletePost = function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'post deleted'});
    });
};