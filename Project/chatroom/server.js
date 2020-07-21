const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const io = require('socket.io');
const regs = require('./libs/regs.js');

//数据库
let db = mysql.createPool({host:'localhost',user:'root',password:'root',database:'test'});

//1.http服务器
let httpServer = http.createServer((req,res)=>{
	fs.readFile(`www${req.url}`,(err,data)=>{
		if(err){
			res.writeHeader(404);
			res.write('not found');
		}else{
			res.write(data); 
		}
		res.end();
	});
});
httpServer.listen(8089);

//2.webSocket服务器
let aSock=[];//在线用户数组
let wsServer = io.listen(httpServer);
wsServer.on('connection',sock=>{
	aSock.push(sock);//添加在线用户
	let cur_username = '';//当前登录用户的用户名
	let cur_userID=0;//当前登录用户的ID 
	let cur_userAvatar = '';

	//注册
	sock.on('reg',(user,pass)=>{
		//1. 校验数据
		if(!regs.username.test(user)){
			sock.emit('reg_ret',1,'用户名不符合规范');
		}else if(!regs.password.test(pass)){
			sock.emit('reg_ret',1,'密码不符合规范');
		}else{
			//2. 用户名是否存在
			db.query(`SELECT id FROM user_table WHERE username='${user}'`,(err,data)=>{
				if(err){
					sock.emit('reg_ret',1,'数据库有错误');
				}else if(data.length!=0){
					sock.emit('reg_ret',1,'用户名已存在');
				}else{
					//3.插入
					db.query(`INSERT INTO user_table (username,password,online) VALUES('${user}','${pass}',0)`,err=>{
						if(err){
							sock.emit('reg_ret',1,'数据库有错误');
						}else{
							sock.emit('reg_ret',0,'注册成功');
						}
					})
				}
			})
		}
	});
	//登陆
	sock.on('login',(user,pass)=>{
		//1. 校验数据
		if(!regs.username.test(user)){
			sock.emit('login_ret',1,'用户名不符合规范');
		}else if(!regs.password.test(pass)){
			sock.emit('login_ret',1,'密码不符合规范');
		}else{
			//2. 取用户信息
			db.query(`SELECT id,password,avatar FROM user_table WHERE username='${user}'`,(err,data)=>{
				if(err){
					sock.emit('login_ret',1,'数据库有错误');
				}else if(data.length==0){
					sock.emit('login_ret',1,'此用户不存在');
				}else if(data[0].password!=pass){
					sock.emit('login_ret',1,'用户名或密码错误');
				}else{
					//3. 修改在线状态
					db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].id}`,err=>{
						if(err){
							sock.emit('login_ret',1,'数据库有错误');
						}else{
							sock.emit('login_ret',0,'登陆成功');
							cur_username = user;
							cur_userID = data[0].id;
							cur_userAvatar = data[0].avatar;
							console.log(data[0].avatar)
							if(cur_userAvatar){
								sock.emit('avatar',cur_userAvatar);
							}
							//上线通知
							aSock.forEach(item=>{
								if(item==sock)return;//用户不接收自己上线的通知
								item.emit('shangxian',cur_username);//广播给其他用户
							});
						}
					})
				}
			});
		}
	});

	//发言
	sock.on('msg',txt=>{
		if(!txt){
			sock.emit('msg_ret',1,'消息文本不能为空');
		}else{
			//广播给所有人
			aSock.forEach(item=>{
				if(item==sock)return;//用户不接收自己发送的消息

				item.emit('msg',cur_username,txt);//广播给其他用户
			});

			sock.emit('msg_ret',0,'发送成功');//消息反馈
		}
	})
	//离线
	 sock.on('disconnect',()=>{
	 	db.query(`UPDATE user_table SET online=0 WHERE id=${cur_userID}`,err=>{
	 		if(err){
	 			console.log('数据库有错误',err);
	 		}
	 		aSock.forEach(item=>{
	 			if(item==sock)return;//用户不接收自己发送的消息
	 			item.emit('xiaxian',cur_username);//广播给其他用户
	 		});
	 		cur_username='';
	 		cur_userID=0;

	 		//从在线用户数组中删除用户
	 		aSock=aSock.filter(item=>item!=sock);
	 	})
	 });
})