<template>

        <div v-if="data.isMe" class="chatbox right">
            <el-row justify="end">
              <el-col :span="18" style="text-align: end;">
                <span>{{data.name}}</span>
                <div class="content" style="background-color:aqua">{{data.content}}</div>
              </el-col>
              <el-col :span="3">
                <el-avatar shape="square" :size="40" :src="data.avatar"></el-avatar>
              </el-col>
            </el-row>    
        </div>
        <div v-else class="chatbox left">
            <el-row >
              <el-col :span="3">
                <el-avatar shape="square" :size="40" :src="data.avatar"></el-avatar>
              </el-col>
              <el-col :span="18" style="text-align: start;">
                <span>{{data.name}}</span>
                <div class="content" style="background-color:white">{{data.content}}</div>
              </el-col>
            </el-row>   
        </div>
    
</template>

<script>
    export default{
        props:['data', 'index']
    }
</script>

<style>
    .chatbox{
        width: 100%;
        min-height: 50px;
        margin: 5px 10px;
        display: flex;
        flex-direction: column;
    }
    .content{
        min-width: 20px;
        min-height: 20px;
        padding: 8px;
        border-radius: 5px;
    }
    /* .chatbox.right{
        float: right;
    }
    .chatbox.left{
        float: left;
    } */
    .chatbox span{
        font-size: 12px;
        color: #000;
    }
</style>