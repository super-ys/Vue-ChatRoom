<template>
    <el-form 
    :rules="rules"
    ref="ruleForm"
    label-position="top"
    :model="ruleForm"
    status-icon 
    label-width="120px"
    class="reg-From"
    >
    <h3>注册</h3>
      <el-form-item  prop="account">
        <el-input v-model="ruleForm.account" maxlength="10" size="large" :prefix-icon="User"  placeholder="创建账号(字母和数字组成)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="username">
        <el-input v-model="ruleForm.username" size="large" :prefix-icon="Avatar" placeholder="请输入昵称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input v-model="ruleForm.pass" size="large" :prefix-icon="Lock" type="password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="account">
        <el-input v-model="ruleForm.checkPass" size="large" :prefix-icon="Lock" type="password" placeholder="请再次输入密码" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
      <p style="font-size: 14px;">已有账号？<router-link to="/login">去登录</router-link></p>
      </el-form-item>
    </el-form>
</template>

<script>
    import {Avatar,User, Lock} from '@element-plus/icons-vue'

    export default{
        mounted(){
            console.log(this.$route.params.d)
        },

        data(){
            // 校验账号
            var checkAccount = (rule, value, callback) =>{
                if(!value){
                    return callback(new Error('账号不能为空'));
                }
                else if(value.length < 5){
                    return callback(new Error('账号长度不得小于六位'));
                }
                else if(!/^\w+$/.test(value)){
                    return callback(new Error('账号必须由数字和字母组成'))
                }else{
                    callback();
                }

            };
            var checkName = (rule, value, callback) =>{
                if (value === '') {
                    callback(new Error('请输入昵称'));
                }else{
                    callback();
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                }else if(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g.test(value) || /\s/g.test(value)){
                    callback(new Error('不能有中文或空格'));
                } 
                else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                }else if(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g.test(value) || /\s/g.test(value)){
                    callback(new Error('不能有中文或空格'));
                }  else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };


            return{
                Avatar,
                User,
                Lock,
                ruleForm:{
                    account:'',
                    username:'',
                    pass:'',
                    checkPass:''

                },
                rules: {
                    account: [{validator: checkAccount, trigger: 'blur'}],
                    username: [{validator: checkName, trigger: 'blur'}],
                    pass: [{validator: validatePass, trigger: 'blur'}],
                    checkPass: [{validator: validatePass2, trigger: 'blur'}]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        alert('submit!');
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-form{
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-light);
        width: 300px;
        padding: 30px 40px;
        background-color: white;
        border-radius: 6px;
    }
    .el-button{
        height: 38px;
        width: 300px;
    }
    .el-input{
        height: 40px
    }
</style>