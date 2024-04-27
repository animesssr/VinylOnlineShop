export default function discAPI(idrelease){

	var Discogs = require('disconnect').Client;

    var db = new Discogs({userToken: 'nkfJnVJQtpLOFrWFlxZHKskcLJibNkGXKPACZgCM'}).database();

	db.getRelease(idrelease, function(err, data){
		var url = data.images[0].resource_url;
		db.getImage(url, function(err, data, rateLimit){
			// Data contains the raw binary image data
			require(fs).writeFile('/tmp/image.jpg', data, 'binary', function(err){
				console.log('Image saved!');
			});
		});
	});   

};

export { discAPI }