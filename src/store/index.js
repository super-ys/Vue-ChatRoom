import {reactive} from 'vue';

const store = {
    state: reactive({
        user:{
            user_id: '10475',
            password: '123456',
            username: 'timeless',
            avatar: '/default/default.jpg'
        },
        friends:[],
        groups:[],
        history_message:[],
        token:''
    })

} 

export default store;