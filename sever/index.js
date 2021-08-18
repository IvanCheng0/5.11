const express = require('express')
const app = express()
var bodyParser = require('body-parser');


app.set('secret', '1i2dn498dsns7')

app.use(require('cors')())
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
//让uploads文件夹下的文件可以通过/uploads来访问
app.use('/uploads', express.static(__dirname + '/uploads'))


require('./db/db')(app)
require('./routes/admin/hero')(app)
require('./routes/admin/index')(app)
require('./routes/admin/item')(app)
require('./routes/admin/articles')(app)
require('./routes/admin/ads')(app)
require('./routes/admin/adminUser')(app)




app.listen(4000, () => {
  console.log('listening')
})