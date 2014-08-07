/**
 * Created by Danny Schreiber on 8/6/14.
 */



module.exports = function(app){
    app.get('/api/blog', function(req, res){
    res.json({message: 'list of blogs'});
    });
};