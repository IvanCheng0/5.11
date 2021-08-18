<template>
  <div>
    <h3>{{id?'编辑':'新建'}}英雄</h3>
    <el-form @submit.native.prevent="save">
      <!-- native表示原生表单，prevent表示阻止默认提交 -->
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息" name="skills">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="10"
              show-score
              style="margin-top:0.6rem"
              v-model="model.scores.difficlut"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="10" show-score style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="10" show-score style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="10" show-score style="margin-top:0.6rem" v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:4000/admin/api/uploads"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col
              :md="9"
              v-for="(item,index) in model.skills"
              :key="index"
              style="margin-right:3rem"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:4000/admin/api/uploads"
                  :show-file-list="false"
                  :on-success="res=>{$set(item,'icon',res.url)}"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top:1rem">保存</el-button>
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
      items: [],
      categories: [],
      model: {
        name: '',
        avatar: '',
        title: null,
        categories: '',
        scores: {
          difficult: 0,
        },
        skills: [],
      },
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/heroes', this.model)
      }
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.model = res.data
    },
    afterUpload(res) {
      console.log(res)
      this.model.avatar = res.url
    },
    async fetchOptions() {
      const res = await this.$http.get('/categories')
      // this.model.categories = res.data.toString()
      // console.log(res.data)
      // let change = res.data
      // let chan = change
      //   .map((value) => {
      //     return value.name
      //   })
      //   .toString()
      // console.log(chan)
      // this.model.categories = chan
      // console.log(this.model.categories instanceof Array)
      // console.log(this.model.categories)
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get('/items')
      this.items = res.data
    },
  },
  created() {
    this.fetchItems()
    this.fetchOptions()
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