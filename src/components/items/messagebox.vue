<template>

        <div v-if="data.isMe" class="bkbubble left">
          
              <div class="bkbubble-right chat-tetx">{{data.content}}</div>
              <span class="triangle-top-right"></span>
  
              <span class="right-name">{{data.name}}</span>
          
            <el-avatar shape="square" :size="40" :src="data.avatar"></el-avatar>
          
        </div> 

        <div v-else class="bkbubble right">
          
          <el-avatar shape="square" :size="40" :src="data.avatar"></el-avatar>
          <span>{{data.name}}</span>
          <span class="triangle-top-left"></span>
          
          <span class="bkbubble-left">
           
            <div class="chat-text">{{data.content}}</div>
          </span>
             
        </div>
    
</template>

<script>
    export default{
        props:['data', 'index']
    }
</script>

<style scoped>
  
  .triangle-top-left {
    width: 5px;
    height: 5px;
    border-top: 15px solid #EEEEEE;
    border-left: 15px solid transparent;
    margin-top: 10px;
    margin-left: 5px;
  }
  .triangle-top-right {
        width: 5px;
        height: 5px;
        border-top: 15px solid #FED3BD;
        border-right: 15px solid transparent;
        margin-top: 10px;
        margin-right: 5px;
  }
  .bkbubble.right div:before, .bkbubble.left div:before {
      border-style: solid;
      margin-top: 5px;
  }

  .bkbubble {
      margin: 15px 0px;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: top;
      align-items: top;
  
  }

  .bkbubble.left {
    -webkit-justify-content: right;
    justify-content: right;
  }

  .bkbubble .bkbubble-left {
      padding: 10px;
      border-radius: 5px;
      background-color: #EEEEEE;
  }

  .bkbubble-right {
      padding: 10px;
      background-color: #FED3BD;
      border-radius: 5px;
  }

  .bkbubble.right {

      margin-left: 10px;
      border-width:0 0 12px 12px;
  }

  .bkbubble.left {
      margin-right: 5px;
      border-width: 0 0 12px 12px ;
  }

  .chat-image{
      width: 150px;
      height: 150px;
  }
  .chat-avatar {
    width: 40px; 
    height: 40px;
  }
  .chat-text {
    max-width: 400px;
  }
</style>