var mongoose = require('mongoose'),
  DB_MYBLOG= 'mongodb://localhost:27017/myBlog';

/**
 * 连接
 */
mongoose.connect(DB_MYBLOG,{useMongoClient:true});


mongoose.Promise = global.Promise;
/**
 * 连接成功
 */
mongoose.connection.on('connected',function() {
  console.log('Mongoose连接成功' + DB_MYBLOG);
});

/**
 * 连接异常
 * */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose连接异常: ' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose连接断开');
});


module.exports = mongoose;

