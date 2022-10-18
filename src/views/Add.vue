<template>
    <el-container class="common-layout">
        <el-header >
            <h3>{{tipMsg}}</h3>
            <div v-if="tipMsg!='创建群聊'">
                <el-row >
                <el-col :span="20">
                    <!-- <el-input v-mode="res" placeholder="请输入账号"/> -->
                    <el-input v-model="input" placeholder="输入账号" />
                </el-col>
                <el-col :span="4">

                    <el-button  @click="searchUser">搜索</el-button>
                    
                </el-col>
            </el-row>
            </div>
            <div v-else>
                <el-row style="margin-bottom: 30px;"> 
                    <el-input v-model="account" maxlength="10" minlength="5" placeholder="请输入账号" />
                </el-row>
                <el-row style="margin-bottom: 30px;">
                  <el-col :span="24">
                    <el-input v-model="name" maxlength="10" minlength="5" placeholder="请输入名称" />
                </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-button primary style="width: 200px"  @click="createGroup">创建</el-button>
                  </el-col>
                </el-row>
            </div >
           
            
        </el-header>
        <el-main v-if="tipMsg!='创建群聊'">
            <el-scrollbar style="height=100px;">
                <li v-for="item in list.data">
                    <el-avatar shape="square" :size="50" :src="item.head"></el-avatar>
                    <span class="text">
                        <span>{{item.userid}}</span>
                        <span>{{item.name}}</span>
                    </span>
                    <el-button :disabled="item.isAdd" @click="addUser(this)">{{item.isAdd?'已添加':'添加'}}</el-button>
                </li>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script setup>
    import {reactive, ref, onMounted} from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute()
    const input = ref("")
    const list = reactive({data:[]})
    const user_data = reactive({data:[
        {
            head:'/default/default.jpg',
            userid: '3334444',
            name: '孤独患者',
            isAdd: false
        },
        {
            head:'/others/jack.jpg',
            userid: '2634458',
            name: '在等待',
            isAdd: true
        }
    ]})
    const tipMsg = ref("")

    function searchUser(){
        if(input.value != ""){
            list.data = user_data.data
        }else{
            list.data = []
        }
    }

    function addUser(e){
        console.log(e)
    }


    function createGroup(){

    }

    onMounted(
        () =>{
            if(route.params.type == 'friend'){
                tipMsg.value = '添加好友'
            }else if(route.params.type == 'group'){
                tipMsg.value = '添加群聊'
            }else{
                tipMsg.value = '创建群聊'
            }
        }
    )
    


</script>

<style scoped>
    .el-container{
        height: 600px;
        background-color: white;
        border-radius: 6px;
    }
    .common-layout{
        width: 500px;
        border: 1px solid var(--el-border-color);
        box-shadow: var(--el-box-shadow-light);
    }
    .el-scrollbar{
        margin-top: 30px;
    }

    .text{
        display: flex;
        flex-direction: column;
    }
    
    li{
        padding: 5px 10px;
        border-top: 1px solid #ccc;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        
        /* flex-direction: column; */
    }
    li:last-child{
        border-bottom: 1px solid #ccc;
    }

</style>