<template>
  <div>
    <h3>{{id?'编辑':'新建'}}广告位</h3>
    <el-form @submit.native.prevent="save">
      <!-- native表示原生表单，prevent表示阻止默认提交 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button @click="model.items.push({})">
        <i class="el-icon-plus">添加广告位</i>
      </el-button>
      <el-row type="flex" style="flex-wrap:wrap">
        <el-col :md="9" v-for="(item,index) in model.items" :key="index" style="margin-right:3rem">
          <el-form-item label="跳转链接">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="图片URL">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:4000/admin/api/uploads"
              :show-file-list="false"
              :on-success="res=>{$set(item,'image',res.url)}"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="model.items.splice(index,1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
        items: [],
      },
      parents: [],
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/ads', this.model)
      }
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`/ads/${this.id}`)
      this.model = res.data
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