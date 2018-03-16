<template>
    <div class="login background">
      <!-- <div class="blur"></div> -->
      <!--头部-->
      <div class="header flex">
        <p class="cancel">取消</p>
        <p class="title">登录</p>
      </div>      
      <!--登录-->
      <div class="content">
        <div class="logo background"></div>
        <div class="info">
          <div class="account">
            <i class="iconfont">&#xe679;</i>
            <input type="text" class="opacity_input" v-model="phone" placeholder="用户名/手机号" @blur="changeCount">
          </div>
          <div class="password">
            <i class="iconfont">&#xe64c;</i>
            <input type="password" class="opacity_input"  v-model="password" placeholder="密码">
          </div>
          <button class="button" @click="enter"  v-loading.fullscreen.lock="fullscreenLoading">登录</button>
        </div>
        <div class="account_manage flex">
          <p class="forget">忘记密码</p>
          <p class="register">注册</p>
        </div>
      </div>
      <!--第三方登录-->
      <div class="other_login">
        <div class="wrapper">
          <div class="content">
            <i class="line"></i>
            <span class="title">第三方账号登陆</span>
            <i class="line line-right"></i>
          </div>
        </div>
        <div class="other_login_way flex">
          <div class="login_way_wx">
            <i class="iconfont">&#xe6b3;</i>
            <p>微信登录</p>
          </div>
          <div class="login_way_wb">  
            <i class="iconfont">&#xe6b2;</i>
            <p>微博登录</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {      
			phone: this.config.phone?this.config.phone:'',
      password:'',
      fullscreenLoading : false,
    }
  },
  watch : {    
  },
  computed : {},  
	created(){
		if(this.config.phone) this.phone = this.config.phone;
		if(this.config.token) {
			this.$router.push("/page1");
		}
	},
  methods : {
    changeCount(){
			var reg=/^[1][3,4,5,7,8][0-9]{9}$/;  
			if(!/^[0-9]*$/.test(this.phone)||!reg.test(this.phone)) {
        this.$message({
          showClose: true,
          message: "手机号输入不正确",
          type: 'error'
        });
        return true;
      }
    },
		enter(){
      if(this.changeCount()) return;
      if(!this.password) {
        this.$message({
          showClose: true,
          message: "密码不正确",
          type: 'error'
        });
        return;
      }
      this.fullscreenLoading = true;
			this.axios("/login", {phone: this.phone,password: this.password}, function(res){
        this.fullscreenLoading = false;
				this.config.setCookie("loginAccount",this.phone);
				this.config.setCookie("token",res.token);
				this.config.phone = this.phone;
				this.config.token = res.token;
        this.$router.push("/page1");
			}, function(){
			})
		},
  }
}
</script>
<style scoped>
  .login{color:#fff;width:100%;height:100%;background-image:url(../assets/img/star.jpg);background-position: right bottom;}
  .login .blur:before{background-image:url(../assets/img/star.jpg);background-position: center bottom;background-repeat:no-repeat;background-size:cover;}
  .login .header{position:relative;height:100px;line-height:100px;}
  .login .header .cancel{position: absolute;left:0px;top:0px;width:110px;margin:0;}
  .login .content{margin-top:20px;}
  .login .header .title{flex:1;-webkit-flex:1;text-align:center;font-size:34px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin: 0 110px;}
  .login .logo{background-image:url(../assets/img/logo.png);height:200px;width: 100%;background-size: 110px 120px;}
  .login .account,.login .password{position:relative;width:100%;border-radius:40px;height:88px;line-height:88px;box-shadow:0px 0px 8px rgba(255, 255, 255, .3);background-color:rgba(0,0,0,.6);}
  .login .account>i,.login .password>i{position: absolute;height:100%;line-height:88px;width:72px;text-align:right;color:#fff;font-size:40px;}
  .login .account{margin-top:40px;}
  .login .password{margin-bottom:50px;margin-top:27px;}
  .login .info input{text-indent: 82px;}
  .login .content>div,.login .other_login>div{width:80%;margin: 0 auto;}
  .login .content .account_manage{justify-content:space-between;margin-top:20px;}
  .login .other_login{margin-top:68px;}
  .login .other_login .wrapper{color:white;}
  .login .other_login .content{display: flex; display: -webkit-flex; -webkit-align-items: center;}
  .login .other_login .line{flex:1; height: 1px; background: white; background: -webkit-linear-gradient(left, transparent , rgba(255,255,255,0.5));}
  .login .other_login .line-right{background: -webkit-linear-gradient(right, transparent , white);}
  .login .other_login .title{margin: 0 20px;}
  .login .login_way_wx,.login .login_way_wb{width:50%;margin-top:20px;margin-bottom:40px}
  .login .other_login_way i{font-size:100px;}
</style>
