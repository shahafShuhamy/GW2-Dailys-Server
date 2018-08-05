const expect = require('expect');
const mongoose = require('../db/mongo').mongoose;
var {DailyAchivement} = require('../db/models/Daily');

describe('MongoDB Tests', function(){

    it('should save a data in mongo and return the same saved one',(done) =>{
        var result = saveToDataBase((date) =>{
            console.log('data type : '+typeof(data));
            expect(result).toInclude({ Name: 'test Daily' });
        });
        done();
    });

    it('should delete the Doc from the before method',(done) => {
        var deletedDoc = deleteFromDataBase((result) => {
            expect(deletedDoc).toInclude('has been removed').toBeA('string');
        });
        done();
    });
});


function deleteFromDataBase(callback){
    DailyAchivement.findOneAndRemove({Name: 'test Daily'},(err) =>{
        if(err){
            return "could not remove from Data Base";
        }
        return "doc has been removed";  
    });
}

function saveToDataBase(callback) {
    var DailyA = new DailyAchivement({
            Date:new Date().getDate(),
            Name:'test Daily',
            Daily_Description:'Doing the Daily Gives 1000 Gold',
            Daily_Type:'PVE',
            Daily_Requirement:'Level of at least 5'
    });

    DailyA.save().then((doc)=>{
        return doc;
    } ,(error) => {
        console.log('error saving '+doc);
    });
}