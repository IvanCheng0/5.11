module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const Item = require('../../models/items')
  router.post('/items', async (req, res) => {
    const model = await Item.create(req.body)
    res.send(model)
  })
  router.get('/items', async (req, res) => {
    const items = await Item.find({}).populate('parent')
    res.send(items)
  })
  router.get('/items/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    Item.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/items/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    Item.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/items/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await Item.findByIdAndDelete(params, req.body, (err, docs) => {
      if (!err) {
        res.send({
          success: true
        })
      }
    })
  })
  app.use('/admin/api', router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '../../../uploads' })
  app.post('/admin/api/uploads', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:4000/uploads/${file.filename}`
    res.send(file)
  })


}