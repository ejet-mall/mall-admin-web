<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="subjectData"
             :rules="rules"
             ref="subjectFrom"
             label-width="150px">
      <el-form-item label="专题标题：" prop="title">
        <el-input v-model="subjectData.title"></el-input>
      </el-form-item>
      
      <el-form-item label="专题分类：">
        <el-select v-model="subjectData.categoryId" @change="selectOnChange"
                   placeholder="请选择专题分类">
          <el-option
            v-for="item in selectSubjectCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

      </el-form-item>

      <!-- <el-form-item label="专题下商品数量：">
        <el-input v-model="subjectData.productCount"></el-input>
      </el-form-item> -->

      <el-form-item label="是否显示：">
        <el-radio-group v-model="subjectData.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否推荐：">
        <el-radio-group v-model="subjectData.recommendStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="商品专题图标：">
        <single-upload v-model="subjectData.pic"></single-upload>
      </el-form-item>
      
      <el-form-item label="专题描述：">
        <el-input
          :autoSize="true"
          v-model="subjectData.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="专题内容：">
        <el-input
          :autoSize="true"
          v-model="subjectData.content"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

  import {fetchListAll, fetchList, createSubject, getSubject, updateSubject, updateRecommendStatus, updateShowStatus, deleteSubject} from '@/api/subject'

  import {fetchList as subjectCateList} from '@/api/subjectCate';
 
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultSubject = {
    pic: '',
    title: '',
    categoryId: '',
    categoryName: '',
    productCount: 0,
    recommendStatus: 0,
    showStatus: 0,
    description: '',
    content: '',
    sort: 0
  };
  export default {
    name: "SubjectDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        subjectData: Object.assign({}, defaultSubject),
        selectSubjectCateList: [],
        rules: {
          title: [
            {required: true, message: '请输入专题标题名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      if (this.isEdit) {
        getSubject(this.$route.query.id).then(response => {
          this.subjectData = response.data;
        });
      } else {
        this.subjectData = Object.assign({}, defaultSubject);
      }
       //获取分类列表
      this.getSelectSubjectCateList();
    },
    methods: {
      getSelectSubjectCateList() {
        subjectCateList({pageSize: 100, pageNum: 1}).then(response => {
          this.selectSubjectCateList = response.data.list;
          // this.selectSubjectCateList.unshift({id: 0, name: '请选择专题分类'});
        });
      },

    selectOnChange(val){
        var obj = {};
        obj = this.selectSubjectCateList.find(item =>{
            return item.id === val 
        });
        //console.log(obj.name)
        this.subjectData.categoryName = obj.name;
        //console.log(JSON.stringify(this.subjectData))
        //this.$refs['subjectFrom'].categoryName.value = obj.name;
    },

      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateSubject(this.$route.query.id, this.subjectData).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createSubject(this.subjectData).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.subjectData = Object.assign({}, defaultSubject);
      },
      
    },
    filters: {
      filterLabelFilter(index) {
        if (index === 0) {
          return '筛选属性：';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content .el-cascader {
    width: 460px;
    }
</style>
