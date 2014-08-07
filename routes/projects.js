/**
 * Created by Danny Schreiber on 8/6/14.
 */


module.exports = function(app){
    app.get('/api/projects', function(req, res){
        res.json({message: 'list of projects'});
    });
};