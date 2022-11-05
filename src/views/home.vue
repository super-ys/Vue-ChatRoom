<template>
<el-container>

    <Statusbar>
        <template #options>
            <el-icon @click="switchTab(1)" :color="index==1?'#19CAAD':'#fff'" size="30px"><ChatDotRound /></el-icon>
            <el-icon @click="switchTab(2)" :color="index==2?'#19CAAD':'#fff'" size="30px"><User /></el-icon>
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
                    <el-icon id="plus" ref="plusRef" color="#fff" v-click-outside="onClickOutside" size="20px"><Plus/></el-icon>
                    <el-popover ref="popoverRef" :virtual-ref="plusRef" trigger="click" virtual-triggering>
                        <ul class="menu">
                            <li><router-link to="/add/friend">添加好友</router-link></li>
                            <li><router-link to="/add/group">添加群</router-link></li>
                            <li><router-link to="/add/create">创建群聊</router-link></li>
                        </ul>
                    </el-popover>
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
            <div>
                <el-scrollbar height="360px">
                    <Messagebox v-for="(item, index) in history_msg.list" :data="item" :index="index" />
                </el-scrollbar>
            </div>
           
            
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
    import { reactive, ref, unref } from 'vue';
    import { onMounted, inject, nextTick, onUnmounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { ClickOutside as vClickOutside } from 'element-plus'
    // import axios from 'axios';
    import { connection, close, sendMessage} from '../websocket/socket.js'
    import { getFriends, getGroups, getGroupHistory, getFriendHistory } from '../axios/api';
    
    const store = inject('store')
    var user = null
    const router = useRouter()
    //  聊天人员列表数据
    const data = reactive({list: []})
    // 历史信息数据
    const history_msg = reactive({list:[]})


    // 弹出框
    const plusRef = ref()
    const popoverRef = ref()
    const onClickOutside = () => {
        unref(popoverRef).popperRef?.delayHide?.()
    }

    
    // 点击侧边栏切换数据逻辑
    const index = ref(1)
    function switchTab(index){
        switch(index){
            case 1: 
                data.list = store.state.friends.concat(store.state.groups);
                break;
            case 2: data.list = store.state.friends; break;
            case 3: data.list = store.state.groups; break;
        }
        console.log('好友/群聊列表 => ', data.list)
        this.index = index;
        this.check = true;
    }


    // 点击一个列表（好友，或群聊），打开相应的聊天界面， 并获取历史消息
    const to = ref("")
    const isgroup = ref(false)
    const name = ref("")
    const check = ref(true)
    function goChat(item){
        to.value = item.id       
        check.value = false
        if(item.count){ // 点击的是群聊
            name.value = item.name + '(' + item.count + ')'
            isgroup.value = true
            getGroupHistory(item.id, user.userid)
            .then(function(res){
                if(res.data.code == '200'){
                    history_msg.list = res.data.data
                }else{
                    history_msg.list = []
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }else{
            // 点击的是好友
            isgroup.value = false
            name.value = item.name

            // 获取好友历史消息
            getFriendHistory(user.userid, item.id)
    
            .then(function(res){
                if(res.data.code == '200'){
                    console.log('histroy', res.data.data)
                    history_msg.list = res.data.data
                }else{
                    history_msg.list = []
                }
            })
            .catch(function(err){
                console.log(err)
            })

        }
        
        
    }



    // 发送消息逻辑
    const message = ref("")
    function send(){
        
        let sendMsg = {
            from: user.userid,
            to: to.value,
            name: user.username,
            from_avatar: user.avatar,
            content: message.value,
            type: 'text',
            isGroup: isgroup.value,
            create_time: new Date().getTime()
        }
        message.value = "";
        sendMessage(sendMsg)
        showMsg(sendMsg)

   }

   function showMsg(msg){
        console.log('msg==>', msg)
        if(msg.from == undefined)
            msg = JSON.parse(msg)
        let s = {
            user_id: msg.from,
            name: msg.name,
            avatar: msg.from_avatar,
            content: msg.content,
            isMe: msg.from == user.userid,
            time: msg.time
        }
        
        history_msg.list.push(s)
    }


    // TODO 搜索框输入事件
    const search = ref("")
    function getSearch(value){
        setTimeout(() => {
            console.log(value)
        }, 1000)
        
    }

    // 页面挂载时的逻辑
    onMounted(
       () =>{

            user = JSON.parse(localStorage.getItem('user'))
            if(user == null){
               
                router.push({path:'/login', replace:true})
                return;
                
            }else{
                // 创建连接， 并接受发来的消息
                const m = connection('ws://localhost:8080/chatserver/'+ user.userid)
                
                if(m != null && !m.data.users){
                    // 收到其他人发来地消息，展示
                    console.log('发来的消息：', m.data)
                    showMsg(m.data)
                }else if(m != null){  // 收到系统发来的消息，在线列表
                    console.log(m.data)
                }
            }
           

            
            // 获取自己地好友与群数据
            const friends = reactive({res:''})
            const groups = reactive({res: ''})
            Promise.all([getFriends(user.userid), getGroups(user.userid)])
            .then(function(results){
                friends.res = results[0].data;
                groups.res = results[1].data;
                console.log('friends.res==>', friends.res)
                console.log('groups.res==>', groups.res)

                let newFriends = reactive({list: []});
                let newGroups = reactive({list: []});


                if(friends.res.code == '200' && groups.res.code == '200'){
                    console.log('成功进入')
                    friends.res.data.map(item => {
                        let obj = {
                            id : item.userid,
                            name: item.username,
                            avatar: item.avatar
                        }
                        newFriends.list.push(obj)
                    })
                    groups.res.data.map(item => {
                        let obj = {
                            id: item.group_id,
                            name: item.group_name,
                            avatar: item.group_head,
                            count: item.group_count
                        }
                        newGroups.list.push(obj)
                    })
                }else{
                    console.log(friends.res.data)
                    console.log('进入失败')
                }
                store.state.friends = newFriends.list
                store.state.groups = newGroups.list
                data.list = newFriends.list.concat(newGroups.list);

            })
            .catch(function(err){
                console.log(err)
            })
            
       }
    )

    onUnmounted(
        () => {
            close()
        }
    )

</script>

<style scoped>

    .menu li{
        cursor: pointer;
        text-align: center;
        width: 120px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ccc;
        position: relative;
        left: -40px;
        list-style-type: none;
    }
    li{
        cursor: pointer;
        text-align: center;
        width: 220px;
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