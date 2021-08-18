module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const Ad = require('../../models/ads')
  router.post('/ads', async (req, res) => {
    const model = await Ad.create(req.body)
    res.send(model)
  })
  router.get('/ads', async (req, res) => {
    const items = await Ad.find({}).populate('parent')
    res.send(items)
  })
  router.get('/ads/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    Ad.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/ads/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    Ad.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/ads/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await Ad.findByIdAndDelete(params, req.body, (err, docs) => {
      if (!err) {
        res.send({
          success: true
        })
      }
    })
  })
  app.use('/admin/api', router)

}