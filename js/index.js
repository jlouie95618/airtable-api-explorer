var requestify = require('requestify'); 

function getReq (url, apiKey, callback) {
	requestify.get(url, {
		headers: {
			"Authorization": 'Bearer '+apiKey,
			// "Access-Control-Allow-Origin": "http://localhost:8000"
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
	}).then(function(response) {
		callback(response.getBody());
	});
}

function putReq(url, apiKey, body, callback) {
	requestify.put(url, body, {
		headers: {
        	"Authorization": 'Bearer '+apiKey
    	},
	}).then(function(response) {
		callback(response.getBody());
	});
}

module.exports = {
	getReq: getReq,
	postReq: postReq,
	putReq: putReq
};