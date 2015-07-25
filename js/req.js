var requestify = require('requestify'); 
var request = require('request');

var URL_SUFFIX = '&forceInsecureCrossDomain=ALLOW_ANY_DOMAIN';

function getReq (url, apiKey, callback) {
	url += URL_SUFFIX;
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

function deleteReq(url, apiKey, callback) {
	requestify.delete(url, {
		headers: {
        	"Authorization": 'Bearer '+apiKey,
    	},
	}).then(function(respose) {
		callback(response.getBody());
	});
}

module.exports = {
	getReq: getReq,
	postReq: postReq,
	putReq: putReq,
	deleteReq: deleteReq
};