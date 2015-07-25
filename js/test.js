// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);
var req = require('./req.js');

var API_KEY = 'keyveGbANOdAYCs2x';

$(document).ready(function() {

    //Place for jQuery code!!!
    $('.api-version').change(function(eventData) {
        var selectedValue = $('.api-version').val();
        if (selectedValue === 'curl') {
            console.log('curl happened!');
            $('.api-version-curl').show();
            $('.api-version-node').hide();
        } else if (selectedValue === 'node') {
            console.log('node happened!');
            $('.api-version-node').show();
            $('.api-version-curl').hide();
        }
    });

    $('.request-types').change(function(eventData) {
        var selectedValue = $('.request-types').val();
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

    $('.send-button').click(function(eventData) {
        console.log('send button pressed!');
    });

});