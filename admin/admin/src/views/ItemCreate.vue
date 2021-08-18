<template>
  <div>
    <h3>{{id?'编辑':'新建'}}物品</h3>
    <el-form @submit.native.prevent="save">
      <!-- native表示原生表单，prevent表示阻止默认提交 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:4000/admin/api/uploads"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}, //接收URL参数id
  },
  data() {
    return {
      model: {
        icon: null,
      },
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`/items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/items', this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`/items/${this.id}`)
      this.model = res.data
    },
    afterUpload(res) {
      console.log(res)
      this.model.icon = res.url
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>