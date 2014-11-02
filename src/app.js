var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var moment = require('moment');
var fs = require('fs');
var rowsProcessor = require('./rowsProcessor.js');
var scheduleService = require('./scheduleService.js');
var intervalService = require('./intervalService.js');
var pbpConverter = require('./pbpConverter.js');

var main = function() {
    var pageDate;
    
    //scheduleService.getGameSchedule('10/27/2014', moment().format('MM/DD/YYYY'), function(data) {
    scheduleService.getGameSchedule('03/01/2014', '03/02/2014', function(data) {        
        data.forEach(function(gamesOnDate) {
            pageDate = moment(gamesOnDate.date, 'MM/DD/YYYY');
            console.log(pageDate.format('MM/DD/YYYY'));
            
            var scheduleFilePath = "data\\schedule\\" + gamesOnDate.date.split("/").join("") + ".json";
            fs.writeFile(scheduleFilePath, JSON.stringify(gamesOnDate, null, 4), function(err) {
                if (err) console.log('error writing schedule file');
            });
            
            gamesOnDate.games.forEach(function(val) {
                var url = 'http://www.nhl.com/scores/htmlreports/' + 
                          getSeason(pageDate) + '/PL' + val.gameId + '.HTM';
                          
                var delay = intervalService.getNextWait([50, 1500]);
                writeLogToFile(url, delay);            
            });
        });
    });
};

var getSeason = function(dt) {    
    var season = "";
    if ( dt.isBefore(moment('2014/08/01')) ) {
        season = (dt.year() - 1) + "" + dt.year();
    } else {
        season = dt.year() + "" + (dt.year() + 1);
    }

    return season;
};

main();

function writeLogToFile(url, delay) {
    setTimeout(function() {
        var pageHTML = rowsProcessor.getPageHTML(url, function(err, resp, body) {
            var logJSON = rowsProcessor.run(body);
            
            var jsonPath = "data\\pbp\\json\\" + url.slice(url.length - 10, url.length - 4) + ".json";
            
            fs.writeFile(jsonPath, JSON.stringify(logJSON, null, 4), function(err) {
                if (err) console.log('error writing pbp json') ;
            });
            
            var csv = pbpConverter.json2Csv(logJSON);
            
            var csvPath = "data\\pbp\\csv\\" + url.slice(url.length - 10, url.length - 4) + ".csv";
            fs.writeFile(csvPath, csv, function(err) {
                if (err) console.log('error writing pbp csv');            
            });
            
        });
    }, delay);
}
