var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
    type: 'yui-js',
	//home page
	
//    fileIn: '../../public/js/custom/home/home.js',
//    fileOut: '../../public/js/minify_js/home/home-min.js',
	
	//offerprofile page
	
	fileIn: '../../public/js/custom/offerprofile/offerprofile.js',
    fileOut: '../../public/js/minify_js/offerprofile/offerprofile-min.js',
    callback: function(err, min){
        console.log(err);
//        console.log(min);
    }
});








//minify = require('minify');
//minify('../../public/js/minify_js/home/home-min.js', function(error, data) {
//    if (error)
//        console.error(error.message);
//    else
//        console.log(data);
//});