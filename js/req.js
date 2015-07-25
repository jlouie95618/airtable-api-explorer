var request = require('request');

var URL_SUFFIX = 'forceInsecureCrossDomain=ALLOW_ANY_DOMAIN';

function getReq(aurl, apiKey, callback) {
	aurl = aurl + '&' + URL_SUFFIX;
	console.log('get url:', aurl);
	request({
		method: 'GET',
		url: aurl,
		json: true,
		headers: {
			"Authorization": 'Bearer ' + apiKey
		}
	}, function(error, response, body) {
		if (error) {
			return console.error('upload failed:', error);
		}
		console.log(body);
		callback(body);
	});
}

function postReq(aurl, apiKey, abody, callback) {
	aurl += "?";
	aurl += URL_SUFFIX;
	request({
		method: 'POST',
		url: aurl,
		body: abody,
		json: true,
		headers: {
			"Authorization": 'Bearer ' + apiKey,
			"Content-type": "application/json"
		}
	}, function(error, response, body) {
		if (error) {
			return console.error('upload failed:', error);
		}
		callback(body);
	});
}

function putReq(aurl, apiKey, abody, callback) {
	aurl += "?";
	aurl += URL_SUFFIX;
	request({
		method: 'PUT',
		url: aurl,
		body: abody,
		json: true,
		headers: {
			"Authorization": 'Bearer ' + apiKey,
			"Content-type": "application/json"
		}
	}, function(error, response, body) {
		if (error) {
			return console.error('upload failed:', error);
		}
		callback(body);
	});
}

function deleteReq(aurl, apiKey, callback) {
	aurl = aurl + '?' + URL_SUFFIX;
	request({
		method: 'DELETE',
		url: aurl,
		json: true,
		headers: {
			"Authorization": 'Bearer ' + apiKey,
		}
	}, function(error, response, body) {
		if (error) {
			return console.error('upload failed:', error);
		}
		callback(body);
	});
}

module.exports = {
	getReq: getReq,
	postReq: postReq,
	putReq: putReq,
	deleteReq: deleteReq
};