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
var
    url = require("url"),
    httputils = require("./httputils");

/**
 * Downloads the json file, converts it to JSONP, and calls the callback function with the result.
 * 
 * @param res the http response object
 * @param xmlUrl the url of the JSON we want to download
 * @param callbackFunctionName the name of the JSONP callback function
 * @param callback the function to run once this call succeeds. The first parameter will be the result as a string.
 */
exports.get = function(res, xmlUrl, callbackFunctionName, callback) {

    if (!xmlUrl || !callbackFunctionName) {
        callback(callbackFunctionName + "({error:'invalid parameters'}");
        return;
    }

    // get query passed in..
    var urlIn = url.parse(xmlUrl);

    if (!callbackFunctionName) {
        callbackFunctionName = "";
    }

    var options = {
        host: urlIn.hostname,
        port: 80,
        path: urlIn.pathname,
        "user-agent": "node.js"
    };

    httputils.downloadTextFile(options,
        function success(data) {
           callback(callbackFunctionName + "(" + data + ");");
        },
        function error(msg, e) {
            callback(callbackFunctionName + '({error:"' + msg.replace(/"/g, "'") + '"})');
        });
};


