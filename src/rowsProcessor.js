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
    
    var processRow = function(row) {      
        var tds = $(row).children("td");
        var result = {};
        
        result.eventNumber = tds.eq(0).text().trim();
        result.period = tds.eq(1).text().trim();
        result.strength = tds.eq(2).text().trim();
        result.timeElapsed = tds.eq(3).html().split('<br>')[0].trim(); 
        result.timeRemaining = tds.eq(3).html().split('<br>')[1].trim();
        
        result.event = tds.eq(4).text().trim();
        result.description = tds.eq(5).text().trim();
        result.awayOnIcePlayers = processPlayersOnIce(tds.eq(6));
        result.homeOnIcePlayers = processPlayersOnIce(tds.eq(7));
        
        return result;    
    }
    
    var run = function(domString) {
        $ = cheerio.load(domString);
        
        var rows = $('tr.evenColor');
        
        var processedRow = {};
        var processedRows = [];
        
        rows.each(function(key, val) {
            processedRow = {};
            processedRow = processRow(val);        
            
            processedRows.push(processedRow);
        });
        
        return processedRows;
    }

    return {
        run: run
    };
})();