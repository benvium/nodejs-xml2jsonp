nodejs-xml2jsonp
================

This software runs under node.js and provides a web service that can convert from XML to JSONP. This is especially
useful for web apps that want to read XML-based data sources such as RSS or ATOM feeds. JSONP also allows a way around
ajax's cross domain restrictions.

To install this app on your node js server you'll need to add the _xml2js_ and _journey_ modules. I recommend npm as
a way to do this.

    npm install -g xml2js
    npm install -g journey

To run the code, cd to the directory where you checked out the code and type

    node server.js


API
---

There are currently two commands:

###xml2jsonp - Convert an xml document to JSONP

####Example with CURL
    curl "http://your.node.installation.here/xml2jsonp?url=http://www.example.com/rss.xml&callback=myCallback"

####Example with HTML and jQuery
    <!DOCTYPE html>
    <html>
    <head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript">

        // This is the example XML file..
        var url = "http://www.example.com/rss.xml";

        $("document").ready(function() {
            $.getJSON(
                    "http://your.node.installation.here/xml2jsonp?callback=?&url=" + url,
                    function(data) {
                        alert(JSON.stringify(data, null, 4));
                    }
            );
        });
    </script>
    </head>
    <body>
    </body>
    </html>

###json2jsonp - Convert a JSON document to JSONP (handy for getting around cross-domain restrictions)

####Example with CURL
    curl "http://your.node.installation.here/json2jsonp?url=http://www.example.com/doc.json&callback=myCallback"

####Example with HTML and jQuery
    <!DOCTYPE html>
    <html>
    <head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript">

        // This is the example JSON file..
        var url = "http://www.example.com/doc.json";

        $("document").ready(function() {
            $.getJSON(
                    "http://your.node.installation.here/json2jsonp?callback=?&url=" + url,
                    function(data) {
                        alert(JSON.stringify(data, null, 4));
                    }
            );
        });
    </script>
    </head>
    <body>
    </body>
    </html>
Licence
-------

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