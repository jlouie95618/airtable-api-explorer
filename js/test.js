// "use strict";
// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);
var req = require('./req.js');

var API_KEY = 'keyveGbANOdAYCs2x';
var GET_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets?limit=3&view=Main%20View';
var POST_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets';
var PUT_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets/recOcqnThpdLJg2or';
var DELETE_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets/VALID_RECORD_ID'
var POST_EXAMPLE_BODY = '{"fields": {\n\t"Diet": "Vegetarian"\n\t}\n}';
var PUT_EXAMPLE_BODY = '{"fields": {\n\t"Diet": "Vegan",\n\t"Friendly Restaurants": ["rec4yyy8mHQWfQizN","recvw2vwaxlCt5tzW"]\n\t}\n}';

// var PUT_EXAMPLE_BODY = '{\"fields\": {\"Diet\": \"Vegetarian\"}}';

$(document).ready(function() {

    //Place for jQuery code!!!

    var method;

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
        var filler;
        method = $('.request-types').val();
        if (method === 'get') {
            filler = GET_EXAMPLE_URL;
        } else if (method === 'post') {
            filler = POST_EXAMPLE_URL;
            $('.request-body-text').text(POST_EXAMPLE_BODY);
        } else if (method === 'put') {
            filler = PUT_EXAMPLE_URL;
            $('.request-body-text').text(PUT_EXAMPLE_BODY);
        } else if (method === 'delete') {
            filler = DELETE_EXAMPLE_URL;
        } else {
            filler = '';
        }
        console.log('filler: ', filler);
        $('.url-field').attr('value', filler);
    });

    $('.send-button').click(function(eventData) {
        var body = $('.request-body-text').val();
        if (body) {
            var body = JSON.parse(body);
        }
        var url = $('.url-field').val() + '';
        var response = '';

        console.log('send button pressed!');
        console.log('method: ', method);
        console.log('url: ', url);
        console.log('body: ', body);

        if (method === 'get') {
            console.log('sending get request');
            req.getReq(url, API_KEY, function(res) {
                response = JSON.stringify(res, null, 3);
                $('.response-text').text(response);
            });
        } else if (method === 'post') {
            req.postReq(url, API_KEY, body, function(res) {
                response = JSON.stringify(res, null, 3);
                $('.response-text').text(response);
                reloadAirtable();
            });
        } else if (method === 'put') {
            console.log('putting ', url, API_KEY, body);
            req.putReq(url, API_KEY, body, function(res) {
                console.log(res);
                response = JSON.stringify(res, null, 3);
                $('.response-text').text(response);
                reloadAirtable();
            });
        } else if (method === 'delete') {
            req.deleteReq(url, API_KEY, function(res) {
                console.log(res);
                response = JSON.stringify(res, null, 3);
                $('.response-text').text(response);
                reloadAirtable();
            });
        }
    });


    function reloadAirtable() {
        $('iframe').attr('src', $('iframe').attr('src'));
    }

});