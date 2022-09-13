<template>
<el-container v-if="check"></el-container>
<el-container v-else>
    <el-header height="60px" style="background-color:#fff">
        <slot name="title"></slot>
    </el-header>
    <el-scrollbar height="360px" >
        <slot name="room"></slot>
    </el-scrollbar>
    <el-footer height="180px" style="background-color:#fff">
        <slot name="send"></slot>
    </el-footer>
    </el-container>
</template>


<script setup>
    import { ref } from 'vue'

    const check = ref(true)

    
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
  .el-footer{
    padding: 20px 10px;
    
  }
</style>