var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');


module.exports = (function() {
    var $;
    var scheduleUrl = 'http://www.nhl.com/ice/schedulebyday.htm?date='
    var gamesInfo = [];
    var gamesByDate = [];
    
    var getGameSchedule = function(startDate, endDate, callback) { 
        var currentDate = moment(startDate, 'MM/DD/YYYY');
        endDate = moment(endDate, 'MM/DD/YYYY');

        processSchedulePage(currentDate, endDate.add(1, 'days'), function() {
            callback(gamesByDate);
        });
    };
    
    var processSchedulePage = function(cur, end, callback) {
        if (cur.isSame(end)) {
            callback();
            return;
        }
        
        request(scheduleUrl + cur.format('MM/DD/YYYY'), function(err, resp, body) {
            if (err) console.log('err in schedule request');
            
            body = body.split("&nbsp;").join(" ");
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
//                        if (cur.isBefore()) {
                            gamesInfo.push(processRow(val, cur));
//                        } else {
//                            gamesInfo.push(processRowFuture(val));
//                        }
                    }
                });     
                gamesByDate.push({
                    date: cur.format('MM/DD/YYYY'),
                    games: gamesInfo                
                });
                gamesInfo = [];
                
                processSchedulePage(cur.add(1, 'days'), end, callback);
            }
        });    
    };

    var processRow = function(val, dt) {
        var gameInfo = {};
        
        gameInfo.awayTeam = $(val).find('td:nth-child(1) .teamName a').text();
        gameInfo.homeTeam = $(val).find('td:nth-child(2) .teamName a').text();
        gameInfo.startTime = $(val).find('td:nth-child(3) .skedStartTimeEST').text();
        
        gameInfo.timeParts = getTimeParts(gameInfo.startTime);
        
        var pageDate = moment(dt);
        pageDate.add(gameInfo.timeParts.hours, 'hours');
        pageDate.add(gameInfo.timeParts.minutes, 'minutes');
        if (gameInfo.timeParts.meridiem === "PM") {
            pageDate.add(12, 'hours');
        }
        var nowInEST = moment().add(3, 'hours');    // our app runs in PST
        
        if (pageDate < nowInEST) { 
            var score = $(val).find('td:nth-child(4) span:nth-child(1)').text();
            gameInfo.awayScore = score.slice(score.indexOf('(') + 1, score.indexOf(')'));
            score = $(val).find('td:nth-child(4) span:nth-child(2)').text();
            gameInfo.homeScore = score.slice(score.indexOf('(') + 1, score.indexOf(')'));
            
            var recapLink = $(val).find('td:nth-child(5) a:nth-child(1)').attr('href');
            gameInfo.gameId = recapLink.slice(recapLink.length - 6);
            gameInfo.photosLink = $(val).find('td:nth-child(5) a:nth-child(3)').attr('href');
        } else {
            gameInfo.previewLink = $(val).find('td:nth-child(5) a:nth-child(1)').attr('href');
            gameInfo.gameId = gameInfo.previewLink.slice(gameInfo.previewLink.length - 6);
        }
        return gameInfo;
    };
    
    var getTimeParts = function(timeString) {
        var timeParts = {
            hours: null, 
            minutes: null, 
            meridiem: null,
            timezone: null
        };
        
        timeParts.hours = timeString.slice(0, timeString.indexOf(":"));
        timeParts.minutes = timeString.substr(timeString.indexOf(":") + 1, 2);
        timeParts.meridiem = timeString.substr(timeString.indexOf(":") + 4, 2);
        timeParts.timezone = timeString.substr(timeString.length - 2, 2);
        
        return timeParts;
    };
    
    return {
        getGameSchedule: getGameSchedule,
    }
})();