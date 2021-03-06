/**
 * Created by Danny Schreiber on 8/6/14.
 */


var Project = require('../server/models/project');

// Save project
exports.postProjects = function(req, res){
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
};

// find all
exports.getProjects =function(req, res){
    Project.find({}).exec(function(err, projects) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(projects);
        }
    });
};

// find by id
exports.getProject = function(req, res){
    Project.findById(req.params.id).exec(function(err, project) {
        if (err) {
            res.send('error', {
                status: 500
            });
        } else {
            res.json(project);
        }
    });
};

// update by id
exports.putProject = function(req, res){
    Project.findById(req.params.id).exec(function(err, project) {
        if (err) {
            res.send('error', {
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
};

// delete by id
exports.deleteProject = function(req, res){
    Project.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'project deleted'});
    });
};
