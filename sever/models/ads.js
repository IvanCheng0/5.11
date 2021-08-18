const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },
  }]
})
//导出mongoose模型
module.exports = mongoose.model('Ad', schema)