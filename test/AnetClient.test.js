const expect = require('expect');
const AnetClient = require('../AnetClient');

describe('Anet Service Tests', function(){
    var test1Body;
    var idsFromTest2;
    it('should bring all Dailys from ANetClient module',(done) =>{
        AnetClient.testBaseUrl((err, body)=>{
            this.test1Body = body;
            expect(err).toBe(undefined);
            done();
        });
    })

    it('should take a body Json and split it to Ids numbers', (done) =>{
        var object = JSON.parse(this.test1Body);
        var ids = [];

        var fractals = object.fractals; 
        var pve = object.pve;
        var wvw = object.wvw;
        var pvp = object.pvp;

        ids = ids.concat(AnetClient.splitFunction(fractals));
        ids = ids.concat(AnetClient.splitFunction(pve));
        ids = ids.concat(AnetClient.splitFunction(wvw));
        ids = ids.concat(AnetClient.splitFunction(pvp));
        this.idsFromTest2 = ids;
        expect(Array.isArray(ids)).toBe(true);
        expect(ids.length).toBeGreaterThan(1);
        done();
    })

    it('should build a url with all ids from test 2',(done)=>{
        var urlAll = AnetClient.buildUrlWithAchivIds(this.idsFromTest2);
        expect(urlAll).toBeA('string');
        expect(urlAll.length).toBeGreaterThan(20);
        done();
    })
});