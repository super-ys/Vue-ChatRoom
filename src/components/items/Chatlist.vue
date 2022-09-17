<template>
    <el-container>
        <el-header height="60px" style="background-color:#BEE7E9;border: 1px solid #ccc;">
          <slot name="search-plus"></slot>
        </el-header>
        <el-scrollbar height="540px" >
          <slot name="friends"></slot>
       </el-scrollbar>
    </el-container>
</template>

<script setup>
  import {inject} from 'vue'
  const store = inject('store')
  console.log(store) 

</script>

<style scoped>

.el-container {
    background-color: #A0EEE1;
    color: #333;
    text-align: center;
    border: 1px solid #ccc;
    height: 600px;
    width: 200px;
    box-shadow: 0 5px 12px 0 rgb(255 255 255 / 30%);
    opacity: .9;
  }
  .el-scrollbar{
    padding: 0;
  }
</style>