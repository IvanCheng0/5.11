const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: true,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }

  },
})
//导出mongoose模型
module.exports = mongoose.model('AdminUser', schema)