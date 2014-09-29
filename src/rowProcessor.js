var cheerio = require('cheerio');

module.exports = (function() {  
    var $;
    
    var processPlayersOnIce = function(el) {
        var list = [];
        
        $(el).children("table").children("tr").children("td").each(function() {
            var number;
            var position;
            var title = $(this).find("table tr td font").attr("title");
            
            if (title) {
                number = $(this).find("table tr td font").text();
                position = $(this).find("table tr").eq(1).text();
                
                list.push({
                    positionFull: title.split(" - ")[0].trim(), 
                    name: title.split(" - ")[1].trim(),
                    number: number.trim(),
                    positionAbbr: position.trim()
                });
            }        
        });
        return list;
    }
    
    var run = function(rows) {
        $ = cheerio.load(rows);
        
        var result = {};
        var tds = $("tr.evenColor").children("td");
        
        result.eventNumber = tds.eq(0).text();
        result.period = tds.eq(1).text();
        result.strength = tds.eq(2).text();
        result.timeElapsed = tds.eq(3).text().split(/\s+/)[0]; 
        result.timeRemaining = tds.eq(3).text().split(/\s+/)[1];
        result.event = tds.eq(4).text();
        result.description = tds.eq(5).text();
        result.awayOnIcePlayers = processPlayersOnIce(tds.eq(6));
        result.homeOnIcePlayers = processPlayersOnIce(tds.eq(7));
        
        return result;
    }

    return {
        run: run
    };
})();