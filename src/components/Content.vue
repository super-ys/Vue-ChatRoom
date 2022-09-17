<template>
    <div>
        <h2>我是内容组件</h2>
        <h3>{{abc}}</h3>
        <button >传值给父组件</button>
    </div>
</template>

<script setup>
    import {inject} from 'vue'
    const abc = inject('abc')
    console.log(abc)
    const store = inject('store')
    console.log(store)
</script>