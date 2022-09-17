<template>
<el-container>

    <Statusbar>
        <template #options>
            <el-icon @click="getColor(1)" :color="index==1?'#19CAAD':'#fff'" size="30px"><ChatDotRound /></el-icon>
            <el-icon @click="getColor(2)" :color="index==2?'#19CAAD':'#fff'" size="30px"><User /></el-icon>
            <el-icon :color="index==3?'#19CAAD':'#fff'"  size="30px" class="iconfont icon-qunzuduoren" @click="getColor(3)"/>  
        </template>
    </Statusbar>


    <Chatlist>
        <template #search-plus>
            <el-row  :gutter="10">
              <el-col :span="22" >
                <el-input v-model="search" style="height:30px" @input="getSearch" placeholder="搜索聊天" :suffix-icon="Search" ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-icon id="plus" color="#fff" size="20px"><Plus/></el-icon>
                </el-col>
            </el-row>  
        </template>
        <template #friends>
            <ul>
                <li @click="goChat(item)" v-for="item in data.list">
                    <el-row>
                      <el-col :span="5">
                        <el-avatar shape="square" :size="40" :src="item.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="19">
                        <span>{{item.name}}</span>
                    </el-col>
                    </el-row>
                </li>
            </ul>
        </template>
    </Chatlist>


    <ChatRoom :check="check">
        <template #title>
            <span>{{name}}</span>
        </template>

        <template #room>
            <el-scrollbar   ref="myscroll" style="height=360px">
                <Messagebox v-for="(item, index) in history_msg.list" :data="item" :index="index" />
            </el-scrollbar>
            
        </template>

        <template #send>
            <el-input
                v-model="message"
                :rows="5"
                type="textarea"
                placeholder="请输入信息..."
            />
            <div style="margin: 8px 0" ></div>
            <el-button @click="send" type="primary">发送</el-button>
        </template>
    </ChatRoom>
</el-container>

</template>

<script setup>
    import Messagebox from '../components/items/messagebox.vue';
    import Statusbar from '../components/items/Statusbar.vue';
    import Chatlist from '../components/items/Chatlist.vue';
    import ChatRoom from '../components/items/Chatroom.vue';
    import {Search} from '@element-plus/icons-vue';
    import { reactive, ref } from 'vue';
    import { onMounted, inject, nextTick } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    const store = inject('store')
    

    // 侧边栏点击逻辑
    const index = ref(1)
    // TODO 数据
    const data = reactive({list: []})

    function getColor(index){
        switch(index){
            case 1: 
                data.list = store.state.friends.concat(store.state.groups);
                break;
            case 2: data.list = store.state.friends; break;
            case 3: data.list = store.state.groups; break;
        }
        console.log('data.list => ', data.list)
        this.index = index;
        this.check = true;
    }

    // TODO 名字
    const name = ref("")
    const check = ref(true)
    const history_msg = reactive({list:[]})
    function goChat(item){
        check.value = false
        if(item.count){
            name.value = item.name + '(' + item.count + ')'
        }else{
            name.value = item.name
        }
        if(item.id == '11111'){
            history_msg.list = store.state.history_message
        }else{s
            history_msg.list = []
        }
        console.log(item)
    }

    // TODO 消息
    const message = ref("")
    const myscroll = ref(null)
    const counter = ref(0)
   function send(){
    let user = JSON.parse(localStorage.getItem('user'))
    let msg = {
        user_id: user.user_id,
        name: user.username,
        avatar: user.avatar,
        content: message.value,
        isMe: true,
        time: ''
    }
    history_msg.list.push(msg)
    console.log(myscroll)
    nextTick(() => {
        myscroll.value.setScrollTop(history_msg.list.length * 50 +360)

        console.log('sdddd')

    })

   }

    // TODO 搜索框输入事件
    const search = ref("")
    function getSearch(value){
        setTimeout(() => {
            console.log(value)
        }, 1000)
        
    }

     // TODO 判断是否登录
     
    
    onMounted(
       () =>{
            let user = localStorage.getItem('user')
            if(name == null){
                router.push({path:'/login'})
            }else{
                data.list = store.state.friends.concat(store.state.groups);
                return;
            }
       }
    )


    

</script>

<style scoped>

    li{
        cursor: pointer;
        text-align: center;
        width: 198px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ccc;
        position: relative;
        left: -40px;
        list-style-type: none;
    }
    .el-avatar{
        margin-top: 5px;
    }
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