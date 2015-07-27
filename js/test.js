// "use strict";
// Boilerplate to know that we're in business...
console.log('hello world');
console.log($);
console.log(_);
var req = require('./req.js');
var Airtable = require('airtable');

var API_KEY = 'keyveGbANOdAYCs2x';
var GET_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets?limit=3&view=Main%20View';
var POST_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets';
var PUT_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets/recOcqnThpdLJg2or';
var DELETE_EXAMPLE_URL = 'https://api.airtable.com/v0/app9uvKeuVL1pOfCD/Special%20Diets/VALID_RECORD_ID';
var POST_EXAMPLE_BODY = '{"fields": {\n\t"Diet": "Vegetarian"\n\t}\n}';
var PUT_EXAMPLE_BODY = '{"fields": {\n\t"Diet": "Vegan",\n\t"Friendly Restaurants": ["rec4yyy8mHQWfQizN","recvw2vwaxlCt5tzW"]\n\t}\n}';

var GET_NODE = 'base(\'Special Diets\').find(\'recddHv5ovH4Z8znn\', function(err, record) {\n    if (err) { console.log(err); return; }\n    console.log(record);\n});';
var POST_NODE = 'base(\'Special Diets\').create({\n"Diet": "Vegan",\n"Friendly Restaurants": [\n"rec4yyy8mHQWfQizN",\n    "recvw2vwaxlCt5tzW"\n  ]\n}, function(err, record) {\n    if (err) { console.log(err); return; }\n    console.log(record);\n});';
var PUT_NODE = 'base(\'Special Diets\').update(\'recOcqnThpdLJg2or\', {\n  "Diet": "Vegan"\n}, function(err, record) {\n    if (err) { console.log(err); return; }\n    console.log(record);\n});';
var DELETE_NODE = 'base(\'Special Diets\').destroy(\'API_KEY\', function(err, deletedRecord) {\n    if (err) { console.log(err); return; }\n    console.log(\'Deleted record \', deletedRecord.id);\n});';

var base = new Airtable({
    apiKey: API_KEY
}).base('app9uvKeuVL1pOfCD');

$(document).ready(function() {

    //Place for jQuery code!!!

    var method;
    var inputMethod;
    var curlOrNode;

    $('.api-version').change(function(eventData) {
        curlOrNode = $('.api-version').val();
        if (curlOrNode === 'curl') {
            console.log('curl happened!');
            $('.api-version-curl').show();
            $('.api-version-node').hide();
            $('.request-body-input-style').show();
        } else if (curlOrNode === 'node') {
            console.log('node happened!');
            $('.api-version-node').show();
            $('.api-version-curl').hide();
            $('.request-body-input-style').hide();
            inputMethod = 'raw';
        }
    });

    $('.request-types-curl').change(function(eventData) {
        var filler;
        method = $('.request-types-curl').val();
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

    $('.request-types-node').change(function(eventData) {
        method = $('.request-types-node').val();
        if (method === 'get') {
            $('.request-body-text').text(GET_NODE);
        } else if (method === 'post') {
            $('.request-body-text').text(POST_NODE);
        } else if (method === 'put') {
            $('.request-body-text').text(PUT_NODE);
        } else if (method === 'delete') {
            $('.request-body-text').text(DELETE_NODE);
        } else {
            $('.request-body-text').text('');
        }
    });

    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function updateResponse(text) {
        var nodeResponse = text;
        if (typeof text == 'object') {
            var nodeResponse = JSON.stringify(text, null, 3);
        }
        $('.response-text').text(nodeResponse);
    }

    $('.send-button').click(function(eventData) {
        var body;

        if (inputMethod === 'raw') {
            body = $('.request-body-text').val();
        } else if (inputMethod === 'form-data') {
            body = generateObjectWithFormData();
        }
        var response = '';

        if (curlOrNode === 'node') {
            body = replaceAll("console.log", "updateResponse", body);
            console.log(body);
            response = eval(body);
            reloadAirtable();
            return;
        }

        if (body) {
            body = JSON.parse(body);
        }
        var url = $('.url-field').val() + '';


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

    function generateObjectWithFormData() {
        var result = {};
        // result[] = $('.');
        console.log($('.form-data').val());
        return result;
    }

    $('.request-body-input-style').change(function(eventData) {
        inputMethod = $('input[name=data-input]:radio:checked').val();
        if (inputMethod === 'raw') {
            $('.request-body-text').show();
            $('.request-body-form').hide();
        } else if (inputMethod === 'form-data') {
            $('.request-body-form').show();
            $('.request-body-text').hide();
        }
    });

});