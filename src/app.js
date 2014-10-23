var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var moment = require('moment');
var fs = require('fs');
var rowsProcessor = require('./rowsProcessor.js');
var urlService = require('./scheduleService.js');
var intervalService = require('./intervalService.js');
var pbpConverter = require('./pbpConverter.js');

var main = function() {
    urlService.getGameSchedule('10/01/2014', moment().format('MM/DD/YYYY'), function(data) {
        data.forEach(function(val) {
            var url = 'http://www.nhl.com/scores/htmlreports/20142015/PL' + val.gameId + '.HTM';
            var delay = intervalService.getNextWait([50, 1500]);
            writeLogToFile(url, delay);
        });
    });
};

main();


function writeLogToFile(url, delay) {
    setTimeout(function() {
        var pageHTML = getPageHTML(url, function(err, resp, body) {
            var logJSON = rowsProcessor.run(body);
            var filePath = "pbp\\json\\" + url.slice(url.length - 10, url.length - 4) + ".json";
            fs.writeFile(filePath, JSON.stringify(logJSON, null, 4), function(err) {
                //console.log('file successfully written');                                         
            });
            /*
            var csv = pbpConverter.json2Csv(logJSON);
            
            filePath = "pbp\\csv\\" + url.slice(url.length - 10, url.length - 4) + ".csv";
            fs.writeFile(filePath, csv, function(err) {
                console.log('csv written');            
            });*/
            
            //console.log(csv);
        });
    }, delay);
}

var getPageHTML = function(url, callback) {
    request(url, function(err, resp, body) {
        console.log('making request to ' + url);
        if (!err && resp.statusCode == 200) {
            callback(err, resp, body);
        }
    });
}