<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader 
          :change-on-select="true"
          v-model="selectProductCateValue"
          :props="optionDefaultProps"
          :options="productCateOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍：">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {getProduct} from '@/api/product';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      cateList:{
        type:Array,
        default:[]
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hasEditCreated:false,
        //选中商品分类的值
        selectProductCateValue: [],//3,48,285
        productCateOptions: [],
        optionDefaultProps: {
          value: 'id',
          label: 'name',
          children: 'children',
          //multiple: true, 
          //可选择任意节点
          checkStrictly: false 
        },
        brandOptions: [],
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      };
    },
    created() {
      //console.log("created:"+JSON.stringify(this.value))
      this.getProductCateList();
      this.getBrandList();
      
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      }
    },
    
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length>0) {
          //console.log(JSON.stringify("分类："+this.cateList))
          let cate = this.cateList.filter(item=>item.id === newValue[newValue.length-1])[0]
          this.value.productCategoryId = cate.id
          this.value.productCategoryName = cate.name;
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
        console.log("this.value.productCategoryId:"+this.value.productCategoryId)
        console.log("this.value.productCategoryName:"+this.value.productCategoryName)
      }
      
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.parentId);
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = this.formatTreeData(list);
        });
      },
      // 递归方法
      formatTreeData(data){
          // 循环遍历json数据
          for(var i=0;i<data.length;i++){             
              if(data[i].children.length<1){
                  // children若为空数组，则将children设为undefined
                  data[i].children=undefined;
              }else {
                  // children若不为空数组，则继续 递归调用 本方法
                  this.formatTreeData(data[i].children);
              }
          }
          //console.log(data)
          return data;
      },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
      // getCateNameById(id){
      //   console.log("分类："+id)
      //  // console.log(JSON.stringify(this.productCateOptions))
      //   let name=null;
      //   for(let i=0;i<this.productCateOptions.length;i++){
      //     for(let j=0;i<this.productCateOptions[i].children.length;j++){
      //       if(this.productCateOptions[i].children[j] !== undefined && this.productCateOptions[i].children[j].value===id){
      //         name=this.productCateOptions[i].children[j].label;
      //         console.log("取到的name："+name)
      //         return name;
      //       }
      //     }
      //   }
      //   return name
        
        
        // let current = this.productCateOptions.filter(item=>item.id === id)
        // console.log(JSON.stringify(current))
        // return current.name;
      // },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].value === val) {
            brandName = this.brandOptions[i].label;
            break;
          }
        }
        this.value.brandName = brandName;
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content .el-cascader {
    width: 460px;
    }
</style>
