<template>
    <div>
        <h2>我是内容组件</h2>
        <h3>{{msg}}</h3>
        <button @click="sendMessage">传值给父组件</button>
    </div>
</template>

<script>
    export default{
        props:{
            msg: {
                type:String,
                default: '你好'
            }
        },
        data(){
            return{
                result:'这是从子组件传来的数据'
            }
        },
        methods:{
            sendMessage(){
                this.$emit('getData', this.result)
            }
        }
    }
</script>