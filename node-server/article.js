/**
 * 文章信息
 */
var mongoose = require('./db.js'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: { type: String },
  img: { type: String },
  title: { type: String },
  content: { type: String },
  time: {type:String}
});

module.exports = mongoose.model('Article', ArticleSchema);
