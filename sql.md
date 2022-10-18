**数据库表设计**
```mysql
Drop table if exist 'User';
create table 'User'(
	user_id: char(10) not null primary key commit '标识id',
    username: char(10) not null commit '用户名',
    password: char(10) not null commit '密码',
    sex: int not null default 2 commit '0表示男，1表示女，2表示未知'
    avatar: varchar(255) not null default '/default/default.jpg' commit '头像图片路径',
)

Drop table if exist "Relationship";
create tbale 'Relationship'(
	user_id: char(10) not null commit '用户',
    friend_id: char(10) not null commit '好友'
)
-- 好友查询语法
select friend_id as friends from Relationship where user_id ='?' union all select user_id as friends from Relationship where friend_id = '?'

Drop table if exist "Group";
create table 'Group'(
	group_id: char(10) not null primary key commit '群聊账号',
    group_name: char(10) not null commit '群聊名',
    group_head: varchar(255) not null default '' commit '群聊头像', 
    group_owner: char(10) not null commit '群聊所有者',
    group_count: int not null default 0  commit '群聊人数'
)

Drop table if exist 'Groupship'
create table 'Groupship'(
	group_id: char(10) not null commit '群聊账号',
    user_id: char(10) not null commit '群成员'
)

Drop table if exist 'TextMessage'(
	from: char(10) not null commit '发送者',
    to: char(10) not null commit '接收者，用户/群',
    content: varchar(1024) not null commit '消息体',
    isgroup: boolean not null commit '是否为群聊'，
    create_time: time not null commit '创建时间', 
    type : varchar(10) not null default 'text' commit '消息类型（扩展需要）'
)
```
**数据格式定义**

```json
// 消息格式	websocket请求， 传递 session
{
        'from': user1,
        'to': user2/group_id,
        'from_avatar': from_avatar,
        'content': data,
        'isGroup': boolean
        'time' : time,
    	'type': 'text'
}
// 用户信息格式 	post 请求 请求参数 user_id, password
{
    'user_id': user_id,
    'password': password,
    'username': username,
    'avatar' : avatar
}
// 好友列表格式	get 请求 请求参数 user_id
[
    {
        'user_id':user_id,
        'user_name': username,
        'avatar': acatar
    },
    {
        'user_id':user_id,
        'user_name': username,
        'avatar': acatar
    },
    
     ...
    
]
// 群聊消息格式	get 请求 请求参数 user_id
[
    {
    	'group_id': group_id,
    	'group_name': group_name,
    	'group_head': group_head
    }
	...
]
// 历史消息格式	get 请求 请求参数 user_id  user_id/group_id 	分页查询
[
    {
        'user_id': user_id,
        'content': content,
        'name': name,
        'avatar': avatar,
        'isMe': isMe,
        'isMe': boolean
    }
    
    ....
]
```

