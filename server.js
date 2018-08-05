const mongoose = require('./db/mongo').mongoose;
const AnetClient = require('./AnetClient');
const {DailyAchivement} = require('./db/models/Daily');
const utils = require('./utils');

//Saving Daily Achivements Should be at 4Am 
//Data inserting to mongo is with UTC time zone which is 3 hours before Israel locale timezone.
//var todayDate = new Date().toLocaleTimeString('he-IL'); -> to get localtime hour.
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
            process.exit(1); //last callback method in program
        });    
        }
    });