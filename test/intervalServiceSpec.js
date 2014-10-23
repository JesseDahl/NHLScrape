var intervalService = require('../src/intervalService.js');

describe('interval service', function() {
    it('should produce a random millisecond value in the given range', function() {
        var val = intervalService.getNextWait([0, 1]);
        expect(val).toBeLessThan(1);
        expect(val).toBeGreaterThan(0);
        
        val = intervalService.getNextWait([50, 1000]);
        expect(val).toBeLessThan(1000);
        expect(val).toBeGreaterThan(50);
    });
});
