exports.index = function(req, res){
    res.render('page', {debug:false});
};

exports.drawing = function(req, res){
    res.render('drawing', {name: req.params.name, debug:false});
};
