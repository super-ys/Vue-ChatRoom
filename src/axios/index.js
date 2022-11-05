import { inject } from "vue";
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

axios.defaults.baseURL = 'http://127.0.0.1:8080'

// 允许携带cookie
// axios.defaults.withCredentials = true

axios.defaults.timeout = 10000; // 10s
// axios.headers.
axios.interceptors.request.use(
    config => {
        // const store = inject('store')
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token
        }
        return config;
    },
    error =>{
        return Promise.error(error);
    }
)
axios.interceptors.response.use(
    response => {
        console.log('响应拦截：',response)
        return Promise.resolve(response)
    },
    error => {
        // console.log('错误响应：', error.response)

        // console.log('错误：', error)
        if(error.response.status == 401){
            console.log('已进入')
            router.push({path:'/login', replace:true})
            return new Promise(function(){})
        }
        return Promise.reject(error)
    }
)

export default axios