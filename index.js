var express = require('express');
var fs = require('fs');
var https = require('https');
var path = require('path');

var privateKey = fs.readFileSync('ssl-cert/key.pem');
var certificate = fs.readFileSync('ssl-cert/key-cert.pem');

var credentials = {key: privateKey, cert: certificate};


var app = express();

// your express configuration here

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8000);

app.use(express.static(__dirname));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

