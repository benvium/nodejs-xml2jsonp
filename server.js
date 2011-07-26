/*
 Copyright (C) 2011 Ben Clayton www.calvium.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE
*/
require.paths.push('/usr/local/lib/node_modules');
var http = require('http'),
    journey = require('journey'),
    xml2Jsonp = require('./xml2jsonp'),
    json2jsonp = require('./json2jsonp');

//======================================================================
// Create the routing table  request => handling function
//======================================================================
var
router = new (journey.Router);
router.map(function () {

    // Send a welcome message if you hit the root
    //==================================================================
    this.root.bind(function (req, res) {
        res.send("Please use /xml2jsonp or /json2jsonp")
    });

    // map /xml2jsonp
    //==================================================================
    this.get("/xml2jsonp").bind(function (req, res, params) {

        xml2Jsonp.get(res, params.url, params.callback, function(result) {
            res.send(200, {'Content-Type': 'application/javascript'}, result);
        });
    });

    // map /json2jsonp
    //==================================================================
    this.get("/json2jsonp").bind(function (req, res, params) {

        json2jsonp.get(res, params.url, params.callback, function(result) {
            res.send(200, {'Content-Type': 'application/javascript'}, result);
        });
    });
});

//======================================================================
// Set up the server
//======================================================================
http.createServer(
    function (req, res) {
        var body = "";

        req.addListener('data', function (chunk) {
            body += chunk
        });
        req.addListener('end', function () {
            // Dispatch the request to the router
            router.handle(req, body, function (result) {
                res.writeHead(result.status, result.headers);
                res.end(result.body);
            });
        });

    }).listen(80);


console.log('Server running..');


