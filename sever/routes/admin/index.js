module.exports = app => {

  const express = require('express')
  const router = express.Router()

  const Category = require('../../models/category')
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.get('/categories', async (req, res) => {
    const items = await Category.find({}).populate('parent')
    res.send(items)
  })
  router.get('/categories/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    Category.findById(params, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })
  router.put('/categories/:id', (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(params)
    console.log(req.body)
    Category.findByIdAndUpdate(params, req.body, (err, docs) => {
      if (!err) {
        res.send(docs)
      }
    })
  })

  router.delete('/categories/:id', async (req, res) => {
    var id = req.params.id
    var para = id.split('')
    para.shift()
    let params = para.join('')
    console.log(req.body)
    await Category.findByIdAndDelete(params, req.body, (err, docs) => {
      if (!err) {
        res.send({
          success: true
        })
      }
    })
  })
  app.use('/admin/api', router)

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //1、根据用户名找用户
    const AdminUser = require('../../models/adminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      res.status(422).send({
        message: '用户不存在'
      })
    }
    //2、校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //3、返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send(token)
  })

}