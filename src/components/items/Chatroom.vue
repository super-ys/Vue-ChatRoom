<template>
<el-container v-if="check"></el-container>
<el-container v-else>
    <el-header height="60px" style="background-color:#fff">
        <slot name="title"></slot>
    </el-header>
    
        <slot name="room"></slot>

    <el-footer height="180px" style="background-color:#fff">
        <slot name="send"></slot>
    </el-footer>
    </el-container>
</template>


<script setup>
    import {reactive, ref, inject, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router'

    const route = useRoute()
    const router = useRouter()
    defineProps({
        check: Boolean
    })

    onMounted(
        () =>{
            console.log('chatroom onMounted')
            let user = JSON.parse(localStorage.getItem('user'))
            if(user == null ){

                router.push({path:'login', replace:true})
                console.log("跳转到login页面")
                
            }else{
                console.log(user)
                
            }
            

        }
    )
    
</script>

<style scoped>
.el-container {
    background-color: #BEE7E9;
    color: #333;
    text-align: center;
    height: 600px;
    width: 500px;
    box-shadow: 0 5px 12px 0 rgb(255 255 255 / 30%);
    opacity: .9;
    border-radius: 6px;
  }
  .el-header{
    line-height: 60px;
    font-weight: bold;
  }
  .el-footer{
    padding: 20px 10px;
    
  }
</style>