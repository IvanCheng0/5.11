<template>
  <div>
    <h3>{{id?'编辑':'新建'}}文章</h3>
    <el-form @submit.native.prevent="save">
      <!-- native表示原生表单，prevent表示阻止默认提交 -->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: { VueEditor },
  props: {
    id: {}, //接收URL参数id
  },
  data() {
    return {
      model: {},
      categories: [{ _id: '', name: '' }],
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetchCategories() {
      const res = await this.$http.get('/categories')
      console.log(res.data)
      this.categories = res.data
    },
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
}
</script>

<style>
</style>