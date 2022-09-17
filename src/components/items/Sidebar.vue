<template>
    <el-aside width="60px">
        <div class="block">
            <el-avatar shape="square" :size="50" :src="url"></el-avatar>
            <p>{{url}}</p>
        </div>

        <div>
            
            <slot name="options"></slot>
            
        </div>
        
        <div style="margin-top:220px">
            <el-icon  size="30px" color="#fff" class="iconfont icon-logout"></el-icon>
            <el-icon  size="30px" color="#fff"><Setting /></el-icon> 
        </div>   
    </el-aside>
</template>

<script steup>

  import { reactive, ref} from 'vue';
  
  const imgUrl = reactive({url:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'})
  const url = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
  
   
</script>

<style scoped>
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