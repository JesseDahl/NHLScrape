
module.exports = (function() {
    var json2Csv = function(json) {
        var csvStr = "";
        var rowElements = [];
        
        function addAttr(item) {
            if (item) {                
                item = item.replace(/, /g, ' ');
                item = item.replace(/,/g, ' ');
                rowElements.push(item);
            } else {
                rowElements.push("");
            }
        }
        
        json.forEach(function(v) {
            rowElements = [];
            
            addAttr(v.eventNumber);
            addAttr(v.period);
            addAttr(v.strength);
            addAttr(v.timeElapsed);
            addAttr(v.timeRemaining);
            addAttr(v.event);
            addAttr(v.description);

            for (var i = 0; i < 6; i++) {
                if (v.awayOnIcePlayers[i]) {
                    addAttr(v.awayOnIcePlayers[i].positionFull);
                    addAttr(v.awayOnIcePlayers[i].name);
                    addAttr(v.awayOnIcePlayers[i].number);
                    addAttr(v.awayOnIcePlayers[i].positionAbbr);
                } else {
                    for (var j = 0; j < 4; j++) 
                        addAttr();
                }
            }

            for (var i = 0; i < 6; i++) {
                if (v.homeOnIcePlayers[i]) {
                    addAttr(v.homeOnIcePlayers[i].positionFull);
                    addAttr(v.homeOnIcePlayers[i].name);
                    addAttr(v.homeOnIcePlayers[i].number);
                    addAttr(v.homeOnIcePlayers[i].positionAbbr);
                } else {
                    for (var j = 0; j < 4; j++) 
                        addAttr();
                }
            }
            csvStr += rowElements.join(",") + "\r\n";
        });
        return csvStr;
    };

    return { json2Csv: json2Csv };
})();  