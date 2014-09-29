var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var fs = require('fs');
var rowsProcessor = require('./rowsProcessor.js');

var url2 = 'http://www.nhl.com/scores/htmlreports/20132014/PL030415.HTM'

var getUrl = function(fn) {
    request(url2, function(err, resp, body) {
//        if (!err && resp.statusCode == 200) {
            fn(err, resp, body);
//        }
    });
}

var domString = getUrl(function(err, resp, body) {
    //console.log(body);
    var bla = rowsProcessor.run(body);
});
//console.log(domString);
//var bla = rowsProcessor.run();
