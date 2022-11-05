<template>
    <el-aside width="60px">
        <div class="block">
            <el-avatar shape="square" :size="50" :src="url"></el-avatar>
            
        </div>

        <div>
            
            <slot name="options"></slot>
            
        </div>
        
        <div style="margin-top:220px">
            <el-icon @click="logout"  size="30px" color="#fff" class="iconfont icon-logout"></el-icon>
            <el-icon  size="30px" color="#fff"><Setting /></el-icon> 
        </div>   
    </el-aside>
</template>

<script setup>
    import {reactive, ref, inject, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router'
    import { ElMessage } from 'element-plus';
    const route = useRoute()
    const router = useRouter()
    console.log('初始化')
    
    const url = ref('')

    onMounted(
        () =>{
            console.log('statusbar onMounted')
            let user = JSON.parse(localStorage.getItem('user'))
            if(user == null ){
                console.log("跳转到login页面")
                router.push({path:'/login', replace:true})
                return;
                
                
            }else{
                console.log(user)
                url.value = user.avatar
            }
            

        }
    )

    // 退出
    function logout(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setTimeout(() =>{
            ElMessage({
                message: '退出登录成功',
                type: 'success',
            })
            router.push({path:'/login', replace:true})
        }, 1000)
        
    }
</script>

<style>
.el-icon{
    cursor: pointer;
}
.block{
margin-top:20px;
}
.el-aside {
    z-index: 999;
    /* background-color: #D3DCE6; */
    background-color: #A0EEE1;
    color: #333;
    text-align: center;
    height: 600px;
    border: 1px solid #ccc;
    box-shadow: 0 5px 12px 0 rgb(255 255 255 / 30%);
    opacity: .9;
    border-radius: 3px;
  }
  .el-icon{
    display: block;
    margin: 30px auto;
  }
</style>