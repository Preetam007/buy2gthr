exports.list = function(req, res, next)
{ 
	res.render('message', 
	{
		message		: ""
	});
};
