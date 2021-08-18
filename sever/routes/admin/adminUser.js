module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const AdminUser = require('../../models/adminUser')
  router.post('/admin_users', async (req, res) => {
    const model = await AdminUser.create(req.body)
    res.send(model)
  })
  router.get('/admin_users', async (req, res) => {
    const items = await AdminUser.find({}).populate('parent')
    res.send(items)
  })
  router.get('/admin_users/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    AdminUser.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/admin_users/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    AdminUser.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/admin_users/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await AdminUser.findByIdAndDelete(params, req.body, (err, docs) => {
      if (!err) {
        res.send({
          success: true
        })
      }
    })
  })
  app.use('/admin/api', router)

}