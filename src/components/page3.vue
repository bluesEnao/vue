<template>
    <div class="page3">
        <el-button plain><router-link to="/page1">活动页1</router-link></el-button>
        <el-button type="primary" plain><router-link to="/page2">活动页2</router-link></el-button>
        <el-button type="info" @click="exit" plain>退出登录</el-button>
        <hr>
        <h4 class="thr">页面三</h4>
    </div>
</template>
<script>
export default {
  name: 'page3',
  data () {
    return {
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
            this.$router.push("/login");
          }
        });
      }).catch(() => {
      });
    }
  }
}
</script>
<style scoped>
  .page3{margin-top:60px;}
</style>