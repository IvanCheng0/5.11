module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const Article = require('../../models/articles')
  router.post('/articles', async (req, res) => {
    const model = await Article.create(req.body)
    res.send(model)
  })
  router.get('/articles', async (req, res) => {
    const items = await Article.find({}).populate('parent')
    res.send(items)
  })
  router.get('/articles/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    Article.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/articles/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    Article.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/articles/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await Article.findByIdAndDelete(params, req.body, (err, docs) => {
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