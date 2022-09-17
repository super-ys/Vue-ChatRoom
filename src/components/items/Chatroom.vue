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


<script >
    export default{
        props: {
            check: Boolean
        },
        methods:{
            
        },
        update:()=>{
            this.$nextTick(() =>{
                this.$ref['myscroll'].setScrollTop(360)
            })
            console.log(this.$ref['myscroll'])
            console.log("sddd")
            
        }
       
    }

    // const props = defineProps({
    //     check: Boolean
    // })
    // const myscroll = ref(null)
    // console.log(myscroll)
    // nextTick(()=>{
    //     myscroll.warp.scrollTop = 360
    // })
    // const check = ref(true)

    
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