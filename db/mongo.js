//this file will hold connection to Data Base mongo DB
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongodb://Shahaf.Shuhamy:m13bShahaf@ds113452.mlab.com:13452/gw2dailies
/*'mongodb://localhost:27017/TodoApp'*/
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true});

module.exports.mongoose = mongoose;