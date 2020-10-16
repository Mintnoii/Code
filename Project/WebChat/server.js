//起服务器，页面响应
let express = require('express');
let app = express();

let server = require('http').createServer(app);
let io = require('socket.io')(server);

let users = [];

app.use('/',express.static(__dirname + "/www"));

server.listen(8086);
console.log("The Server is running at port 8086...");

//socket
io.on('connection', function(socket){
	socket.on('login', function(nickname){

		//判断用户名是否已经存在
		if (users.indexOf(nickname) > -1){
			socket.emit('loginFailed');
		}else{
			// socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			console.log(nickname + ' is online, total: ' + users.length);
			socket.emit('loginSuccess',nickname);
			io.sockets.emit('system', nickname, users.length, 'login');
		}

	});

	//断开连接，实时更新users数组
	//广播system事件
	socket.on('disconnect', function(){
		var index = users.indexOf(socket.nickname);
		users.splice(index, 1);
		io.sockets.emit('system', socket.nickname, users.length, 'logout');

		//test
		console.log(socket.nickname + ' is disconnected.');
		console.log(users);
	});


	socket.on('msgSend',function(msg){
		console.log(socket.nickname)
		socket.broadcast.emit('newMsg', socket.nickname, msg);
	});

	//接收用户发来的图片
	 socket.on('img', function(imgData) {
	    //通过一个newImg事件分发到除自己外的每个用户
	     socket.broadcast.emit('newImg', socket.nickname, imgData);
	 });

});
