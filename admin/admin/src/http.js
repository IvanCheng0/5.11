import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:4000/admin/api'
})

http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  return Promise.reject(err)
})

export default http