//this file will represent Daily schema as it should be in Data Base.
var mongoose = require('mongoose');

var DailyAchivement = mongoose.model('Achivement',{
        Date:{
            type: Date,
            required: true,
            default: Date.now
        },
        Name:{
            type:String,
            required: true
        },
        Daily_Description:{
            type: String
        },
        Daily_Type:{
            type: String
        },
        Daily_Requirement:{
            type: String
        }
});

module.exports = {DailyAchivement};