/**
 * Created by Danny Schreiber on 8/6/14.
 */



var Blog = require('../server/models/blog');


module.exports = function(app){

    // Save blog
    app.post('/api/blog', function(req, res){
        var blog = new Blog();
        blog.title = req.body.title;
        blog.author = req.body.author;
        blog.body = req.body.body;
        blog.preview = req.body.preview;
        blog.datecreated = req.body.datecreated;
        blog.imagepath = req.body.imagepath;
        blog.isactive = req.body.isactive;
        blog.comments = req.body.comments;
        blog.tags = req.body.tags;

        blog.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'blog created!: ', data: blog});
        });
    });

    //Find all
    app.get('/api/blog', function(req, res){
        Blog.find({}).exec(function(err, blogs) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(blogs);
            }
        });
    });

    // Find by id
    app.get('/api/blog/:id', function(req, res){
        Blog.findById(req.params.id).exec(function(err, blog) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(blog);
            }
        });
    });

    // Update by id
    app.put('/api/blog/:id', function(req, res){
        Blog.findById(req.params.id).exec(function(err, blog) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                blog.title = req.body.title;
                blog.author = req.body.author;
                blog.body = req.body.body;
                blog.preview = req.body.preview;
                blog.datecreated = req.body.datecreated;
                blog.imagepath = req.body.imagepath;
                blog.isactive = req.body.isactive;
                blog.comments = req.body.comments;
                blog.tags = req.body.tags;

                blog.save(function(err){
                    if(err){
                        res.send(err);
                    }
                });

                res.json(blog);
            }
        });
    });

    app.delete('/api/blog/:id', function(req, res){
        Blog.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'blog deleted'});
        });
    });
};