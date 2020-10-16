window.onload = function(){
	let chat = new ChatRoom();
	chat.init();
};

const ChatRoom = function(){
	this.socket = null;
};

ChatRoom.prototype = {
	init: function(){
		let that = this;
		let currentUser = '';
		//建立与服务器的socket连接
		this.socket = io.connect();

		//监听socket的connect事件，此事件表示连接已经建立
		this.socket.on('connect',function(){
			$('#info').text("Report your nickname.( ͒•·̫|'");
			$('#nickWrapper').css('display','block');
			$('#nicknameInput').focus();
		});

		//登录失败
		this.socket.on('loginFailed', function(){
			let info = $('#info');
			info.text("nickname exists, try another ₍₍ (̨̡ ‾᷄ᗣ‾᷅ )̧̢ ₎₎");
			info.css('color','red');
		});

		//登录成功
		this.socket.on('loginSuccess', function(nickname){
			document.title = $('#nicknameInput').text() + '| Pirates Assembly';
			$('#loginWrapper').css('display','none');
			currentUser = nickname;
			$('#inputMsg').focus();
		});
		this._initialEmoji();
		$('#emoji').click(function (e) {
			$('#emojiWrapper').toggle();
			e.stopPropagation();
		});
		$('body').click(function (e) {
			if (!$("#emojiWrapper").is(":hidden")) {
				$("#emojiWrapper").hide();
			}
		});
		//系统人数更新，提示用户新加入或离开
		this.socket.on('system', function(nickname, count, type){
			that._systemInfo(nickname, count, type);
		});

		//收到新消息
		this.socket.on('newMsg', function(nickname, msg){
			that._displayNewMsg(nickname, msg, 'newMsg');
		});

		this.socket.on('newImg', function(nickname, img) {
		     that._displayImage(nickname, img,'newMsg');
		 });
		//设置登陆按钮和nicknameInput的监听事件(click&keyup)login
		$('#loginBtn').click(function(){
			let nickname = $.trim($('#nicknameInput').val());
			if (nickname.length == 0 || nickname.length > 10){
				//如果用户名为空或超出长度限制
				$('#info').text(`(҂‾ ▵‾)︻デ═一 (˚▽˚’!)/ nickname illegal, try another!`);
				$('#info').css('color','red');
				$('#nicknameInput').val("");
				$('#nicknameInput').focus();
			}else{
				//用户名合法
				that.socket.emit('login', nickname);

			}
		});
		$('#nicknameInput').keyup(function (e) {
			if (e.keyCode == 13){
				let nickname = $.trim($(this).val());
				if (nickname.length == 0 || nickname.length > 10){
					//如果用户名为空或超出长度限制
					$('#info').text('(҂‾ ▵‾)︻デ═一 (˚▽˚’!)/ nickname illegal, try another!');
					$('#info').css('color','red');
					$(this).val("");
					$(this).focus();
				}else{
				//用户名合法
				that.socket.emit('login', nickname);
				}
			}
		});
		$('#emojiWrapper').click(function (e) {
			//获取被点击的表情
			let target = $(e.target)[0];
			if (target.nodeName.toLowerCase() == 'img') {
				$('#inputMsg').focus();
				$('#inputMsg').val($('#inputMsg').val() + '[emoji:' + target.title + ']');
			};
		});
		$('#selectImage').change(function() {
		    //检查是否有文件被选中
		     if (this.files.length != 0) {
		        //获取文件并用FileReader进行读取
		         let file = this.files[0],
		             reader = new FileReader();
		         if (!reader) {
		             that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
		             this.value = '';
		             return;
		         };
		         reader.onload = function(e) {
		            //读取成功，显示到页面并发送到服务器
		             this.value = '';
		             that.socket.emit('img', e.target.result);
		             that._displayImage(currentUser, e.target.result,'myMsg');
		         };
		         reader.readAsDataURL(file);
		     };
		 });

		//发送按钮和inputMsg监听事件
		$('#sendBtn').click(function(){
			//1.获取用户输入
			//2.检测是否超出长度限制
			//3.通过检测则直接广播
			let msg = $('#inputMsg').val().replace('\n', '');
			if (msg == ''){
				$('#inputMsg').focus();
				return;
			}
			
			that.socket.emit('msgSend', msg);
			$('#inputMsg').val("");
			that._displayNewMsg(currentUser, msg, 'myMsg');
		});

		$('#inputMsg').keyup(function(e){
			if (e.keyCode == 13){	
				$(this).val($(this).val().replace('\n', ''));
				let msg = $(this).val().replace('\n','');
				if (msg == ''){
					$(this).focus();
					return;
				}
				console.log(that.socket);
				that.socket.emit('msgSend', msg);
				$(this).val("").focus();
				that._displayNewMsg(currentUser, msg, 'myMsg');
			}
		});


	},
	_initialEmoji: function () {
		let	docFragment = document.createDocumentFragment();
		for (let i = 1; i < 27; i++) {
			$('<img>', {
				src: '../images/emoji/' + i + '.gif',
				// alt: 'hello img!',
				title: i,
				// click: function () {
				// 	alert("hello,img!!!");
				// }
			}).appendTo(docFragment);
		};
		$('#emojiWrapper').append(docFragment);
	},
	_showEmoji: function (msg) {
		let match, result = msg,
			reg = /\[emoji:\d+\]/g,
			emojiIndex,
			totalEmojiNum = $('#emojiWrapper').children().length;
		while (match = reg.exec(msg)) {
			emojiIndex = match[0].slice(7, -1);
			if (emojiIndex > totalEmojiNum) {
				result = result.replace(match[0], '[X]');
			} else {
				result = result.replace(match[0], '<img class="emoji" src="../images/emoji/' + emojiIndex + '.gif" />');
			};
		};
		return result;
	},
	_displayNewMsg: function(nickname, msg, who){
		let historyMsg =$('#historyMsg');
		let $p = $('<p></p>');
		$p.attr('class',who);
		//将消息中的表情转换为图片
		let emoji = this._showEmoji(msg);
		let span_nickname = $("<span>").attr('class', 'nickname').text(nickname);
		let time = '(' + new Date().toTimeString().substr(0, 8) + ')';
		let span_timespan = $("<span>").attr('class', 'timespan').text(time);

		let text = document.createTextNode(msg);
		if (who === 'myMsg') {
			$p.html(`${emoji}`);
			$p.append(span_timespan);
			$p.append(span_nickname);
		}else{
			$p.html(`${emoji}`);
			$p.prepend(span_timespan);
			$p.prepend(span_nickname);
		}
		historyMsg.append($p);
		//控制滚动条自动滚到底部
		historyMsg.scrollTop($('#historyMsg')[0].scrollHeight);

	},

	_displayImage: function(user, imgData, who) {
	    let historyMsg = $('#historyMsg');
	    let $p = $('<p>').attr('class',who);

	    let date = new Date().toTimeString().substr(0, 8);
	    if (who === 'myMsg') {
	    	$p.html(`<span class="timespan">(${date})</span><span class="nickname">${user}</span><br/><img src="${imgData}"/>`);	
	    }else{
	    	$p.html(`<span class="nickname">${user}</span><span class="timespan">(${date})</span><br/><img src="${imgData}"/>`);
	    }
	    historyMsg.append($p);
	    historyMsg.scrollTop($('#historyMsg')[0].scrollHeight);
	},

	_systemInfo: function(nickname, count, type){
		
		$('#status').text(count);
		let historyMsg = $('#historyMsg');
		let $p = $('<p>');
		let $span = $('<span></span>');
		let text;
		if (type == 'login'){
			text = document.createTextNode('加入了群聊');
		}else if (type == 'logout'){
			text = document.createTextNode('离开了群聊');
		}

		$p.attr('class','system');
		$span.attr('class','nickname');
		$span.text(nickname);

		$p.append($span);
		$p.append(text);
		historyMsg.append($p);
	}

};



