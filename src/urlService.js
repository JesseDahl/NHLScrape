
module.exports = (function() {
    var urlBase = { 
        pbp: 'http://www.nhl.com/scores/htmlreports/'
    };  
    var year = '20132014/';
    var type = 'PL';
    var gameId = '030415';
    var extension = '.HTM';
    
    
    var getPbpUrl = function(gameId, yr) {
        year = yr || year;
        return urlBase.pbp + year + type + gameId + extension;
    }
    
    return {
        getPbpUrl: getPbpUrl
    }
})();