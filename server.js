const mongoose = require('./db/mongo').mongoose;
const AnetClient = require('./AnetClient');
const {DailyAchivement} = require('./db/models/Daily');
const utils = require('./utils');
var scheduler = require('node-schedule');
var express = require('express');
var app = express();

var j = scheduler.scheduleJob('0 0 10 * * *', () => {
    getDailiesAndPutInDB();
});

//Saving Daily Achivements Should be at 4Am 
//Data inserting to mongo is with UTC time zone which is 3 hours before Israel locale timezone.
var getDailiesAndPutInDB = () =>{
AnetClient.getDailies((dailiesBefore) =>{
    var listToMongo = [];
    if(dailiesBefore){
        var AchivObject = JSON.parse(dailiesBefore);
        AchivObject.forEach(element => {
            var DailyAchivementParsed = new DailyAchivement({
                Name: element.name,
                Daily_Description: element.description,
                Daily_Type: "",
                Daily_Requirement: element.requirement
                });
            listToMongo.push(DailyAchivementParsed);
            });
        DailyAchivement.insertMany(listToMongo,(error, docs) =>{
            if(error){
                console.log('error saving data base list');
            }else{
                console.log('saved Data base list');
            }
        });    
        }
    });
}

//get a day dailies with get method and date :GET/dailies/date
app.get('/dailies/',(req, res) =>{
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);
    var todaysDailies = DailyAchivement.find({Date: {$gte: start, $lt: end}}).then((achivements) =>{
        if(!achivements){
            return res.status(404).send("Could not find such dailies today");
        }

        res.send(achivements);   
    }).catch((err) =>{
        res.status(400).send();
    });
});

app.listen(3000,() => {
    console.log('listenning on port 3000');
});