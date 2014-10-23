
module.exports = (function() {
    var range = [];
    
    var getNextWait = function(rg) {
        range = rg || range || [0, 1];

        return Math.random() * (range[1] - range[0]) + range[0];
    }
    
    return { getNextWait: getNextWait };
})();