const request = require('request');
const rp = require('request-promise');

//URL Variables
const access_token = "access_token=35FB5729-8272-6443-B25A-7086F1FFDDBB31BFCAE5-895D-4344-A9E9-341FF3062434";
const urlParameterDelimiter ="?";
const uriBase = "http://api.guildwars2.com/v2/";
const achievements = "achievements";
const daily = "daily";

var getDailies = function(callback){
    var url = uriBase+achievements+'/'+daily+urlParameterDelimiter+access_token;
    request(url, async (err, res, body) =>{
        var object = JSON.parse(body);
        var ids = [];
        var fractals = object.fractals; 

        ids = ids.concat(splitFunction(fractals));
        var pve = object.pve;
        ids = ids.concat(splitFunction(pve));
        var wvw = object.wvw;
        ids = ids.concat(splitFunction(wvw));
        var pvp = object.pvp;
        ids = ids.concat(splitFunction(pvp));
                     
        var urlAll = buildUrlWithAchivIds(ids);
        console.log('sending url to get Ids : '+urlAll);
        await getActualAchivements(urlAll).then((body) =>{
            callback(body);
        }).catch((err) =>{
            callback(undefined);
        })
    });
}

var splitFunction = function splitToIds(array){
    var ids = [];    
    array.forEach(element => {
        ids.push(element.id);
    });
    return ids;
};

var buildUrlWithAchivIds = function buildUrlWithIds(arrayOfIds){
    var uriIds = uriBase+achievements+urlParameterDelimiter+'ids=';
    let returnB;
    arrayOfIds.forEach(element =>{
        uriIds = uriIds.concat(element+',');
    });
    uriIds = uriIds.slice(0,uriIds.length-1).trim();
    return uriIds;
}

function getActualAchivements(url){
   return new Promise((resolve,reject) =>{
         request(url, (err ,res, body) =>{
            if(err){
                reject (err);
            }else{
                resolve (body);
            }
        })
    });
}

var testBaseUrl = function testbaseUrl(callback){
        var testUrl = uriBase+achievements+'/'+daily+urlParameterDelimiter+access_token;
        request(testUrl,(err, res, body)=>{
            if(err){
                callback(error);
            }
            callback(undefined,body);
        });
};

module.exports.buildUrlWithAchivIds = buildUrlWithAchivIds;
module.exports.splitFunction = splitFunction;
module.exports.testBaseUrl = testBaseUrl;
module.exports.getDailies = getDailies;