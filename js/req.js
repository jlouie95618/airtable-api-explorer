var requestify = require('requestify'); 
var request = require('request');

function getReq (url, apiKey, callback) {
	requestify.get(url, {
		headers: {
			"Authorization": 'Bearer '+apiKey
		}
	}).then(function(response) {
		callback(response.getBody());
	});
}

function postReq (url, apiKey, body, callback) {
	requestify.post(url, body, {
		headers: {
        	"Authorization": 'Bearer '+apiKey
    	},
    	dataType: 'json' // try this or add as header
	}).then(function(response) {
		callback(response.getBody());
	});
}

function putReq(url, apiKey, body, callback) {
	requestify.put(url, body, {
		headers: {
        	"Authorization": 'Bearer '+apiKey,
    	},
    	dataType: 'json' // try this or add as header
	}).then(function(response) {
		callback(response.getBody ());
	});
}

function patchReq(aurl, apiKey, abody, callback) {
	request.patch({
		url: aurl,
		json: true,
		headers: {
			"Authorization": 'Bearer '+apiKey,
		},
		body: abody
	}, function(error, response,body) {
		callback(body);
	});
}

module.exports = {
	getReq: getReq,
	postReq: postReq,
	putReq: putReq,
	patchReq: patchReq
};