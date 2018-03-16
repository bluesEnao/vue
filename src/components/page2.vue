<template>
    <div class="page2">
        <el-button plain><router-link to="/page1">活动页1</router-link></el-button>
        <el-button type="success" plain><router-link to="/page3">活动页3</router-link></el-button>
        <el-button type="info" @click="exit" plain>退出登录</el-button>
        <hr>
        <h3 class="thr">页面二</h3>
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
  .page2{margin-top:60px;}
</style>