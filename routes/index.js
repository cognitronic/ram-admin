/* GET home page. */
exports.index = function(req, res){
  res.json({ title: 'Ram Admin' });
};



exports.client = function(req, res){
    res.sendFile('./client/index.html');
};