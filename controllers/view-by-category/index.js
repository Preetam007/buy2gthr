//connecting to mysql
var ejs1 = require("../../config.js");

var connection  = ejs1.connection;

exports.list = function(req, res)
{
    res.render('./view-by-category.dust',
               {
                 type : (req.params.id !=undefined ? req.params.id : 'all'),
		         messagm :'yes'
        
               });		
};