// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);
var req = require('./req.js');

var API_KEY = 'keyveGbANOdAYCs2x';

$(document).on('change', '.requestTypes', function(eventData) {
    var selectedValue = $('.requestTypes').val();
    console.log(selectedValue);
    if (selectedValue === 'get') {
        req.getReq(url, API_KEY, function(res) {
            console.log(res);
        });
    } else if (selectedValue === 'post') {
        req.postReq(url, API_KEY, body, function(res) {
            console.log(res);
        });
    } else if (selectedValue === 'put') {
        req.putReq(url, API_KEY, body, function(res) {
            console.log(res);
        });
    } else if (selectedValue === 'patch') {
        req.patchReq("https://api.airtable.com/v0/appkoyMlG0TK4ET8m/Interviewers/reckAIOmGMOQcD28x?forceInsecureCrossDomain=ALLOW_ANY_DOMAIN", API_KEY, {
                "fields": {
                    "Onsite Interviews": [
                        "rec9uIPdN0UW5QXcm",
                        "rec9wyLnHQVT2JYfv",
                        "rechyzCjMTVK5Q4em",
                        "rec7wuLnFTMScMVgm"
                    ]
                }
            },
            function(res) {
                console.log(res);
            });
    }
});