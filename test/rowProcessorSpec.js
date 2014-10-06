var processor = require('../src/rowsProcessor.js');

describe('rows processor', function() {
    var body;
     
    beforeEach(function() {
        // or fetch file if you're so inclined
        body = '<tr class="evenColor">     <td align="center" class="+ bborder">2</td>     <td class="+ bborder" align="center">1</td>     <td class="+ bborder" align="center">EV</td>     <td class="+ bborder" align="center">0:00     <br />20:00</td>     <td class=" + bborder" align="center">FAC</td>     <td class=" + bborder">NYR won Neu. Zone - NYR #21 STEPAN vs L.A #11 KOPITAR</td>     <td class=" + bborder + rborder">       <table border="0" cellpadding="0" cellspacing="0">         <tr>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Center - CHRIS KREIDER">20</font>                 </td>               </tr>               <tr>                 <td align="center">C</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Center - DEREK STEPAN">21</font>                 </td>               </tr>               <tr>                 <td align="center">C</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Left Wing - RICK NASH">61</font>                 </td>               </tr>               <tr>                 <td align="center">L</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Defense - ANTON STRALMAN">6</font>                 </td>               </tr>               <tr>                 <td align="center">D</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Defense - MARC STAAL">18</font>                 </td>               </tr>               <tr>                 <td align="center">D</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Goalie - HENRIK LUNDQVIST">30</font>                 </td>               </tr>               <tr>                 <td align="center">G</td>               </tr>             </table>           </td>         </tr>       </table>     </td>     <td class=" + bborder">       <table border="0" cellpadding="0" cellspacing="0">         <tr>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Center - ANZE KOPITAR">11</font>                 </td>               </tr>               <tr>                 <td align="center">C</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Right Wing - MARIAN GABORIK">12</font>                 </td>               </tr>               <tr>                 <td align="center">R</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Left Wing - DUSTIN BROWN">23</font>                 </td>               </tr>               <tr>                 <td align="center">L</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Defense - JAKE MUZZIN">6</font>                 </td>               </tr>               <tr>                 <td align="center">D</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Defense - DREW DOUGHTY">8</font>                 </td>               </tr>               <tr>                 <td align="center">D</td>               </tr>             </table>           </td>           <td align="center"> </td>           <td align="center">             <table border="0" cellpadding="0" cellspacing="0">               <tr>                 <td align="center">                   <font style="cursor:hand;" title="Goalie - JONATHAN QUICK">32</font>                 </td>               </tr>               <tr>                 <td align="center">G</td>               </tr>             </table>           </td>         </tr>       </table>     </td> </tr> ';
    });
    
    it('should extract the correct text values for a single row', function() {
        var p = processor.run(body)[0];
         
        expect(p.eventNumber).toEqual("2");
        expect(p.period).toBe("1");
        expect(p.strength).toBe("EV");
        expect(p.timeElapsed).toBe("0:00");
        expect(p.timeRemaining).toBe("20:00");
        expect(p.event).toBe("FAC");
        expect(p.description).toBe("NYR won Neu. Zone - NYR #21 STEPAN vs L.A #11 KOPITAR");
       
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Center", 
            name: "CHRIS KREIDER",
            number: "20",
            positionAbbr: "C"
        });
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Center", 
            name: "DEREK STEPAN",
            number: "21",
            positionAbbr: "C"
        });
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Left Wing", 
            name: "RICK NASH",
            number: "61",
            positionAbbr: "L"
        });
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Defense", 
            name: "ANTON STRALMAN",
            number: "6",
            positionAbbr: "D"
        });
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Defense", 
            name: "MARC STAAL",
            number: "18",
            positionAbbr: "D"
        });
        expect(p.awayOnIcePlayers).toContain({
            positionFull: "Goalie", 
            name: "HENRIK LUNDQVIST",
            number: "30",
            positionAbbr: "G"
        });        
        expect(p.awayOnIcePlayers.length).toBe(6);

        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Center", 
            name: "ANZE KOPITAR",
            number: "11",
            positionAbbr: "C"
        });
        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Right Wing", 
            name: "MARIAN GABORIK",
            number: "12",
            positionAbbr: "R"
        });
        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Left Wing", 
            name: "DUSTIN BROWN",
            number: "23",
            positionAbbr: "L"
        });
        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Defense", 
            name: "JAKE MUZZIN",
            number: "6",
            positionAbbr: "D"
        });
        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Defense", 
            name: "DREW DOUGHTY",
            number: "8",
            positionAbbr: "D"
        });
        expect(p.homeOnIcePlayers).toContain({
            positionFull: "Goalie", 
            name: "JONATHAN QUICK",
            number: "32",
            positionAbbr: "G"
        });
        expect(p.homeOnIcePlayers.length).toBe(6);
    });
});