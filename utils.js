module.exports = class utils{
    constructor(){

    }

    dateFormat(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+3; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
     return dd+'/'+mm+'/'+yyyy;
    }
}