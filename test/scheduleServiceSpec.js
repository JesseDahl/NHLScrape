var scheduleService = require('../src/scheduleService.js');

describe('url Service unit test', function() {
    var body;
    
    beforeEach(function() {
        body = '<tr>     <td colspan="1" rowspan="1" class="team">       <!-- Away -->       <a style="border-bottom:1px dotted;" onclick="loadTeamSpotlight(jQuery(this));" rel="TOR" shape="rect"       href="javascript:void(0);">         <div style="background-position: 0px -180px;margin-right: 5px" class="display teamJewel mapleleafs">           <!-- Black Background 50% Opacity Overlay -->         </div>       </a>       <div class="teamName">         <a style="border-bottom:1px dotted;" onclick="loadTeamSpotlight(jQuery(this));" rel="TOR" shape="rect"         href="javascript:void(0);">Toronto</a>       </div>     </td>     <td colspan="1" rowspan="1" class="team">       <!-- Home -->       <a style="border-bottom:1px dotted;" onclick="loadTeamSpotlight(jQuery(this));" rel="MTL" shape="rect"       href="javascript:void(0);">         <div style="background-position: 0px -140px;margin-right: 5px" class="display teamJewel canadiens">           <!-- Black Background 50% Opacity Overlay -->         </div>       </a>       <div class="teamName">         <a style="border-bottom:1px dotted;" onclick="loadTeamSpotlight(jQuery(this));" rel="MTL" shape="rect"         href="javascript:void(0);">Montréal</a>       </div>     </td>     <td colspan="1" rowspan="1" class="time">       <!-- Time -->       <div style="display:block;" class="skedStartTimeEST">7:00 PM ET</div>       <div style="display:none;" class="skedStartTimeLocal">7:00 PM ET</div>     </td>     <td colspan="1" rowspan="1" class="tvInfo">     <!-- Network -->     FINAL:      <span class="black">TOR (4)</span> -      <span>MTL (3)</span></td>     <td colspan="1" rowspan="1" class="skedLinks">       <!-- Button Links -->       <a class="btn" shape="rect" href="http://www.nhl.com/gamecenter/en/recap?id=2013020001">         <span>RECAP›</span>       </a>       <a target="_blank" class="btn" shape="rect" href="http://video.nhl.com/videocenter/console?hlg=20132014,2,1&amp;lang=en">         <span>           <span>VIDEO›</span>         </span>       </a>       <a class="btn" shape="rect" href="http://www.nhl.com/ice/gallerylanding.htm?id=38708">         <span>PHOTOS›</span>       </a>     </td> </tr> ';
    });
/*
    it('should return the schedule information for the given game', function() {
        var p = scheduleService.getGameSchedule(body);
        
        expect(p.awayTeam).toBe('Toronto');
        expect(p.homeTeam).toBe('Montréal');
        expect(p.startTime).toBe('7:00 PM ET');   
    });*/
});
