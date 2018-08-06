var env = process.env.NODE_ENV || 'development';
console.log('**** env init **** ',env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else{
    process.env.MONGODB_URI = 'mongodb://Shahaf.Shuhamy:m13bShahaf@ds113452.mlab.com:13452/gw2dailies';
}
