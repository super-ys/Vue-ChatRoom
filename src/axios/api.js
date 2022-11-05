import request from "./index";

export function login(data){
    return request({
        url: 'user/login',
        method: 'post',
        data: data
    })
}

export function getFriends(user_id){
    return request({
        url: 'relation/friends/'+user_id,
        method: 'get'
    })
}

export function getGroups(user_id){
    return request({
        url: 'relation/group/'+user_id,
        method: 'get'
    })
}

export function getGroupHistory(group_id, user_id){
    return request({
        url: 'message/group/'+ group_id + '/' + user_id,
        method: 'get'
    })
}

export function getFriendHistory(user_id, friend_id){
    return request({
        url: 'message/friend/'+ user_id + '/' + friend_id,
        method: 'get'
    })
}

export function register(data){
    return request({
        url: 'user/register',
        method: 'post',
        data: data
    })
}