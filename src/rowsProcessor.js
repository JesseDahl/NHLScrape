var cheerio = require('cheerio');

module.exports = (function() {  
    var $;
    
    var processPlayersOnIce = function(el) {
        var list = [];
        
        $(el).children("table").children("tr").children("td").each(function() {
            console.log(this);
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
    
    var processRow = function(row) {      
        var tds = $(row).children("td");
        var result = {};
        
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
    
    var run = function(domString) {
        $ = cheerio.load(domString);
        
        var rows = $('tr.evenColor');
        console.log($(rows[0]).html());
        var processedRow = {};
        
        rows.each(function(key, val) {
            console.log("*********************************");
            console.log($(key).html());
            //console.log(val);
            console.log("*********************************");
            
            processedRow = processRow(val);        
        });
        
        return processedRow;
    }

    return {
        run: run
    };
})();