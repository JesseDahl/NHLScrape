var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var fs = require('fs');
var rowsProcessor = require('./rowsProcessor.js');
var urlService = require('./scheduleService.js');

urlService.getGameSchedule('10/01/2013', '10/03/2013');
/*
var url2 = 'http://www.nhl.com/scores/htmlreports/20132014/PL030415.HTM'

var getUrl = function(fn) {
    request(url2, function(err, resp, body) {
//        if (!err && resp.statusCode == 200) {
            fn(err, resp, body);
//        }
    });
}

var domString = getUrl(function(err, resp, body) {
    var bla = rowsProcessor.run(body);
    
    fs.writeFile('output.json', JSON.stringify(bla, null, 4), function(err) {
        console.log('file successfully written');
    });
});
*/