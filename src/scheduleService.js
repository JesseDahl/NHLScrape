var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');


module.exports = (function() {
    var $;
    var scheduleUrl = 'http://www.nhl.com/ice/schedulebyday.htm?date='
    var gamesInfo = [];
    
    var getGameSchedule = function(startDate, endDate, callback) { 
        var currentDate = moment(startDate, 'MM/DD/YYYY');
        endDate = moment(endDate, 'MM/DD/YYYY');

        processSchedulePage(currentDate, endDate.add(1, 'days'), function() {
            callback(gamesInfo);
        });
    };
    
    var processSchedulePage = function(cur, end, callback) {
        if (cur.isSame(end)) {
            callback();
            return;
        }
        
        request(scheduleUrl + cur.format('MM/DD/YYYY'), function(err, resp, body) {
            console.log('making request to ' + scheduleUrl + cur.format('MM/DD/YYYY'));
            if (!err && resp.statusCode == 200) {
                $ = cheerio.load(body);
                
                var gameRows = $('table.schedTbl tbody tr');
                
                // for each row in schedule table, see if there's a 
                // child element that has a .team class and scrape the info
                // out of that row 
                gameRows.each(function(key, val) {
                    var bla = $(val).children('.team');
                    
                    if (bla.length > 0) {
                        gamesInfo.push(processRow(val));
                    }
                });     
                processSchedulePage(cur.add(1, 'days'), end, callback);
            }
        });    
    };

    var processRow = function(val) {
        var gameInfo = {};
        
        gameInfo.awayTeam = $(val).find('td:nth-child(1) .teamName a').text();
        gameInfo.homeTeam = $(val).find('td:nth-child(2) .teamName a').text();
        gameInfo.startTime = $(val).find('td:nth-child(3) .skedStartTimeEST').text();
        
        var score = $(val).find('td:nth-child(4) span:nth-child(1)').text();
        gameInfo.awayScore = score.slice(score.indexOf('(') + 1, score.indexOf(')'));
        score = $(val).find('td:nth-child(4) span:nth-child(2)').text();
        gameInfo.homeScore = score.slice(score.indexOf('(') + 1, score.indexOf(')'));
        
        var recapLink = $(val).find('td:nth-child(5) a:nth-child(1)').attr('href');
        gameInfo.gameId = recapLink.slice(recapLink.length - 6);
        gameInfo.photosLink = $(val).find('td:nth-child(5) a:nth-child(3)').attr('href');
        
        return gameInfo;
    };
    
    return {
        getGameSchedule: getGameSchedule,
    }
})();