var socket = null;
import {reactive, ref} from 'vue'

export function checkSocket(){
    if(typeof(WebSocket) == 'undefined'){
    console.log('您的浏览器不支持 web Socket')

    }else{
        console.log('您的浏览器支持 web Socket')
        if(socket != null){
            socket.close();
            socket = null;
        }
    }
}

export function connection(url){
    const messaage = reactive({data:{}})
    const flag = ref(0)
    checkSocket();
    socket = new WebSocket(url);
    socket.onopen = () =>{console.log('WebSocket 已连接')}
    socket.onmessage = (msg) =>{    
        console.log('msg ==> ', msg.data)
        messaage.data = msg.data
        console.log('message ==> ', messaage.data)
        flag.value = 1
    }
    // 首次连接，并不会直接调用onmessage, 所以会传一个空对象回去
    return flag.value == 1? messaage : null
}




export function sendMessage(msg){
    if(socket == null){
        console.log("WebSocket 链接未开启")
        return;
    }
    socket.send(JSON.stringify(msg));
}

export function close(){
    if(socket != null){
        socket.close();
        socket = null;
        console.log("链接已关闭")
    }else {
        console.log("未开启链接")
    }
}


