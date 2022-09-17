import {reactive} from 'vue';

const store = {
    state: reactive({
        user:{
            user_id: '10475',
            password: '123456',
            username: 'timeless',
            avatar: '/default/default.jpg'
        },
        friends:[
            {
                id: '11111',
                name: 'jack',
                avatar: '/others/jack.jpg'
            },
            {
                id: '22222',
                name: 'mike',
                avatar: '/others/mike.jpg'
            }
        ],
        groups:[
            {
                id: '33333',
                name: '相亲相爱一家人',
                avatar: '/default/default-group.jpg',
                count: 10
            },
            {
                id: '44444',
                name: '麻豆工作室',
                avatar: '/others/麻豆工作室.jpg',
                count: 101
            }
        ],
        history_message:[
            {
                user_id: '111111',
                avatar: '/others/jack.jpg',
                name: 'jack',
                content: '你好啊',
                isMe: false,
                time: ''
            },
            {
                user_id: '10475',
                avatar: '/default/default.jpg',
                name: 'timeless',
                content: '你好',
                isMe: true,
                time: ''
            },
            {
                user_id: '111111',
                avatar: '/others/jack.jpg',
                name: 'jack',
                content: '你好帅啊',
                isMe: false,
                time: ''
            },
            {
                user_id: '111111',
                avatar: '/others/jack.jpg',
                name: 'jack',
                content: '我好喜欢你',
                isMe: false,
                time: ''
            },
            {
                user_id: '10475',
                avatar: '/default/default.jpg',
                name: 'timeless',
                content: '哈哈哈谢谢夸奖',
                isMe: true,
                time: ''
            },
        ]
    })

} 

export default store;