
<template>
    <el-container class="common-layout"
    >
        <el-main height="300px">
            <h3>登录</h3>

            <el-input class="login-input"
            size="large"
            v-model="account"
            :prefix-icon ="User"
            icon="el-icon-s-custom"
             placeholder="请输入用户名" >
             </el-input>

            <div style="margin: 30px 0" ></div>
            <el-input 
            class="login-input"
            v-model="password"
            type="password"
            size="large"
            show-password
            :prefix-icon="Lock"
            placeholder="请输入密码" />
            <div style="margin: 30px 0" ></div>
            <el-button type="primary" size="large" @click="checkAccount"  :disabled="isActive" >登录</el-button>
            <p style="font-size: 14px;">没有账户？<router-link to="/register">去注册</router-link></p>
        </el-main>
        
    </el-container>
</template>



<script setup> 

    import {User, Lock} from '@element-plus/icons-vue'
    import {ElMessage} from 'element-plus'
    import {ref, watch, inject} from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import axios from 'axios'
    // 注入数据
    const store = inject('store')

    // 全局路由
    const router = useRouter()  
    // 当前路由
    const route = useRoute()

    const account = ref("")
    const password = ref("")
    const isActive = ref(true)

    watch([account, password], actpwdChange)
    

    function actpwdChange([newAccount, newPwd], [oldAccount, oldPwd]){
        if(newAccount.length >0 && newPwd.length >0){
            isActive.value = false;
        }else{
            isActive.value = true;
        }
    }

    // 验证登录
    function checkAccount(){
       
        axios.post("http://localhost:8080/user/login",{
            userid: account.value,
            password: password.value
        })
        .then(function(res){
            console.log(res)
            if(res.data.code == '200'){
                ElMessage({
                    message: 'Congrats, this is a success message.',
                    type: 'success',
                })
                localStorage.setItem('user', JSON.stringify(res.data.data))
                router.push({path: "/", replace: true})
            }else{
                ElMessage.error(res.msg)
            }
        })
        .catch(function(err){
            ElMessage.error(err)
        })
            
    }
    

</script>

<style scoped>

    .el-container{
        background-color: white;
        border-radius: 6px;
    }
    .common-layout{
        width: 300px;
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-light);
    }

    .el-button{
        height: 38px;
        width: 230px;
    }
    .el-input{
        height: 40px
    }
</style>