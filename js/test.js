// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);

var requestify = require('./index.js');

$(document).on('change', '.requestTypes', function(eventData) {
    var selectedValue = $('.requestTypes').val();
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