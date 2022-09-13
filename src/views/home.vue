<template>
<el-container>
    <Sidebar>
        <el-icon @click="getColor(1)" :color="index==1?'#19CAAD':'#fff'" size="30px"><ChatDotRound /></el-icon>
        <el-icon @click="getColor(2)" :color="index==2?'#19CAAD':'#fff'" size="30px"><User /></el-icon>
        <el-icon :color="index==3?'#19CAAD':'#fff'"  size="30px" class="iconfont icon-qunzuduoren" @click="getColor(3)"/>  
    </Sidebar>


    <Chatlist>
        <template #search-plus>
            <el-row  :gutter="10">
              <el-col :span="22" >
                <el-input v-model="search" @input="getSearch" placeholder="搜索聊天" :suffix-icon="Search" ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-icon id="plus" color="#fff" size="20px"><Plus/></el-icon>
                </el-col>
            </el-row>  
        </template>
        <template #friends>
            <ul>
                <li v-for="item in data.list">
                
                </li>
            </ul>
        </template>
    </Chatlist>


    <ChatRoom>
        <template #title>
            <span>{{name}}</span>
        </template>

        <template #room>

        </template>

        <template #send>
            <el-input
                v-model="message"
                :rows="5"
                type="textarea"
                placeholder="请输入信息..."
            />
            <div style="margin: 8px 0" ></div>
            <el-button type="primary">发送</el-button>
        </template>
    </ChatRoom>
</el-container>

</template>

<script setup>
    import Sidebar from '../components/items/Sidebar.vue';
    import Chatlist from '../components/items/Chatlist.vue';
    import ChatRoom from '../components/items/Chatroom.vue';
    import {Search} from '@element-plus/icons-vue';
    import { reactive, ref } from 'vue';
    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    
   
   
    

    // 侧边栏点击逻辑
    const index = ref(1)

    // TODO 搜索框输入事件
    const search = ref("")

    // TODO 数据
    const data = reactive({list: []})

    // TODO 名字
    const name = ref("")

    // TODO 消息
    const message = ref("")


    function getColor(index){
        switch(index){
            case 1: break;
            case 2: break;
            case 3: break;
        }
        this.index = index;
    }

    function getSearch(value){
        setTimeout(() => {
            console.log(value)
        }, 1000)
        
    }

     // TODO 判断是否登录
     
    
    onMounted(
       () =>{

            let name = localStorage.getItem('username')
            console.log(name)
            if(name == null){
                router.push({path:'/login'})
            }else{
                return;
            }
       }
    )


    function checkLogin(){
        let name = localStorage.getItem('username')
        console.log(name)
        if(name == null){
            router.push({path:'/login'})
        }else{
            return;
        }
    }

</script>

<style scoped>

    #plus{
        margin-top:20px;
    }
    .el-row{
        width:100%;
        height: 100%;
    }
    .el-col{
        height: 60px;
        line-height: 60px;
        align-items: center;
        vertical-align: middle;
        
    }
    .el-container{
        z-index: 999;
        
    }
    .el-icon{
    display: block;
    margin: 30px auto;
    cursor: pointer;
  }
  .el-button{
    position: relative;
    left: 210px;
  }
</style>