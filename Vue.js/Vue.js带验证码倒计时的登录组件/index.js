Vue.component('login-component', {
    data: function () {
        return {
           phone: "",
           captcha:"",
           loginText:"登录",
           authText:'点击获取验证码',
           password:'',
           eyeOpen:false,
           //密码框eye绑定的对象
           pwdInput:{
            pwdType:"password",
            eyeStyle:'fa-eye'
           },
           //请求加载状态
           loading:false,
           //验证码按钮状态
           dis:false
        }
    },
    computed:{
        //判断手机号码格式是否正确
        phoneReg:function(){
            let reg = /^1\d{10}$/g
            return reg.test(this.phone)
        }
    },
    template:`
    <div>
        <header class="navbar">
            <div class="container">
                <a href="#" class="button">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
                <a id="login" ref="login" @click="userLogin" class="title theme-color"><i v-show="loading" class="fa fa-spinner"></i>{{loginText}}</a>
                <a href="#" class="button">
                    <i class="fa fa-times fa-lg" aria-hidden="true"></i>
                </a>
            </div>
        </header>
        <div class="login-component">
            <div class="container">
                <form>
                    <fieldset class="field-tel">
                    <legend class="tiny">手机号</legend>
                    <div class="field-tel-subfield">
                        <select><option value="+86">+86</option></select>
                        <input type="tel" id="tel" ref="tel" v-model.number="phone">
                    </div>
                    </fieldset>
                    <fieldset class="field-code">   
                        <input type="text" ref="code" id="code" v-model="captcha" placeholder="验证码">
                        <a href="#" id="authCode" :disabled="dis" ref="authCode" @click.prevent="getCaptcha($event)">{{authText}}</a>
                    </fieldset>
                    <fieldset class="field-password">
                        <input :type="this.pwdInput.pwdType" v-model="password" id="password" placeholder="密码（不少于6位）">
                        <a href="#" v-show="password.length>=6" class="pwdEye"  @click="changeType"><i class="fa" :class="pwdInput.eyeStyle"></i></a> 
                    </fieldset>
                </form>
            </div>
        </div>
    </div>`,
    methods:{
        getCaptcha:function(event){
            if (this.$data.dis) return
            if (this.phoneReg) {
                this.countTime(60)
                fetch('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha')
                .then(response => response.json())
                .then(data => {
                console.log(data.data.captcha)
                this.$data.captcha = data.data.captcha
                }).catch(e => console.log("Oops, error", e))
            } else {
                alert('手机号码错误！')
            }
        },
        countTime: function(time) {
            this.$data.dis = true
            if (time>0) {
                this.$data.authText = `重发验证码(${time}s)`
                setTimeout(() => this.countTime(--time),1000)
            } else {
                this.$data.authText = `再次获取验证码`
                this.$data.dis = false
            }
        },
        userLogin: function (){   
            if(!this.phoneReg||this.$data.captcha===""){
                return
            }else{
                this.$data.loading = true;
                this.$data.loginText = "加载中...";
                fetch('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/submit', {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "phone": this.$data.phone,
                        "captcha": this.$data.captcha
                    })
                }).then(response => response.json())
                .then(data => {
                    if(data){
                        this.$data.loading = false;
                        this.$data.loginText = "登录";
                    }
                    console.log(data)
                }).catch(e => console.log("Oops, error", e))
            }
        },
        changeType: function(){
            this.$data.pwdInput.pwdType = this.$data.pwdInput.pwdType==='password'?'text':'password'
            this.$data.pwdInput.eyeStyle = this.$data.pwdInput.eyeStyle==='fa-eye-slash'?'fa-eye':'fa-eye-slash'
        }
    }
})
new Vue({
    el:'#loginForm'
})