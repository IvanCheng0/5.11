module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const Hero = require('../../models/heroes')
  router.post('/heroes', async (req, res) => {
    const model = await Hero.create(req.body)
    res.send(model)
  })
  router.get('/heroes', async (req, res) => {
    const items = await Hero.find({}).populate('parent')
    res.send(items)
  })
  router.get('/heroes/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    Hero.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/heroes/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    Hero.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/heroes/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await Hero.findByIdAndDelete(params, req.body, (err, docs) => {
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