const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})
//导出mongoose模型
module.exports = mongoose.model('Item', schema)