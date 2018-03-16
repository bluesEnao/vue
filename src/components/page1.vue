<template>
    <div class="page1">
        <el-button type="primary" plain><router-link to="/page2">活动页2</router-link></el-button>
        <el-button type="success" plain><router-link to="/page3">活动页3</router-link></el-button>
        <el-button type="info" @click="exit" plain>退出登录</el-button>
        <hr>
        <h2 class="thr d" w-800>页面一</h2>
    </div>
</template>
<script>
export default {
  name: 'page2',
  data () {
    return {
      fullscreenLoading : false,
    }
  },
  created(){

  },
  methods :{
    exit(){
      this.$confirm('您是否确认退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.config.delCookie("token");
        this.config.token=null;
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration :800,
          onClose : ()=>{
            this.$router.push("/");
          }
        });
      }).catch(() => {
      });
    }
  }
}
</script>
<style scoped>
  .page1{margin-top:60px;}
  [w-800]{background-color:yellow;}
  [class="thr"]{color:green;}
</style>