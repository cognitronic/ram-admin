/**
 * Created by Danny Schreiber on 8/6/14.
 */


var Project = require('../server/models/project');


module.exports = function(app){

    // Save project
    app.post('/api/projects', function(req, res){
        var project = new Project();
        project.title = req.body.title;
        project.subtitle = req.body.subtitle;
        project.projectdate = req.body.projectdate;
        project.skills = req.body.skills;
        project.description = req.body.description;
        project.imagepaths = req.body.imagepaths;

        project.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'project created!: ', data: project});
        });
    });

    //Find all
    app.get('/api/projects', function(req, res){
        Project.find({}).exec(function(err, projects) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(projects);
            }
        });
    });

    // Find by id
    app.get('/api/projects/:id', function(req, res){
        Project.findById(req.params.id).exec(function(err, project) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(project);
            }
        });
    });

    // Update by id
    app.put('/api/projects/:id', function(req, res){
        Project.findById(req.params.id).exec(function(err, project) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                project.title = req.body.title;
                project.subtitle = req.body.subtitle;
                project.projectdate = req.body.projectdate;
                project.skills = req.body.skills;
                project.description = req.body.description;
                project.imagepaths = req.body.imagepaths;

                project.save(function(err){
                    if(err){
                        res.send(err);
                    }
                });

                res.json(project);
            }
        });
    });

    app.delete('/api/projects/:id', function(req, res){
        Project.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'project deleted'});
        });
    });
};