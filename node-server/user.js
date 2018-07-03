/**
 * 用户信息
 */
var mongoose = require('./db.js'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String }, //用户账号
  userpwd: { type: String }, //密码
  usersex: { type: String }, //性别
  userage: { type: Number } //年龄
});

module.exports = mongoose.model('User', UserSchema);
