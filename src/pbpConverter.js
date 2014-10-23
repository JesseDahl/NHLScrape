
module.exports = (function() {
    var json2Csv = function(json) {
        var csvStr = "";
        
        json.forEach(function(v) {
            var rowStr =    v.eventNumber + ","
                            v.period + ","
                            v.strength + ","
                            v.timeElapsed + ","
                            v.timeRemaining + ","
                            v.event + ","
                            v.description + ",";
/*            
            if (v.awayOnIcePlayers) {
                var p0 =   v.awayOnIcePlayers[0] || "";
                
            }
*/
        });
    
    
    };


    return { json2Csv: json2Csv };
})();