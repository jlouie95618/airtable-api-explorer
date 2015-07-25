// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);

var requestify = require('./index.js');

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
            requestify.getReq("https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Restaurants?limit=3&view=Main%20View?forceInsecureCrossDomain=ALLOW_ANY_DOMAIN", "keyrpG4FPpEqZ0ubg", function(json){
                console.log(JSON.stringify(3, null, json));
            });
        } else if (selectedValue === 'post') {

        } else if (selectedValue === 'patch') {

        } else if (selectedValue === 'delete') {

        }
    });

    $('.send-button').click(function(eventData) {
        console.log('send button pressed!');
    });

});