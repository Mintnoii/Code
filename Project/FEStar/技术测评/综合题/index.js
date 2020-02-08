const {Scene, Sprite,Label} = spritejs
const gameContainer = new Scene('#game-Container', {viewport: ['auto', 'auto'], resolution: [500, 500]})
const gameLayer = gameContainer.layer('gameLayer')
const numberLayer = gameContainer.layer('numberLayer')
//绘制newGame按钮
const newGame = new Scene('#newGameButton', {viewport: ['auto', 'auto'], resolution: [240, 80]})
const newGameLayer = newGame.layer('newgame')
const newGameButton = new Label('NewGame')
  newGameButton.attr({
  size: [200, 60],
  pos: [10, 10],
  font: 'bold 38px Arial',
  lineHeight: 60,
  textAlign: 'center',
  padding: [0, 10],
  backgroundColor: '#8f7a66',
  border: [2.5, '#ccc'],
  bgcolor: '#8f7a66',
  color: '#f8f5f2',
  borderRadius: 20,
})
//将按钮添加到页面
newGameLayer.append(newGameButton)
//按钮事件监听
newGameButton.on('mouseup', evt => {
	initGame();
})

//全局变量
var digital=new Array(); //记录每个格子所对应的数字 二维数组
var gameScore = 0;
var bestResult = 0;
var total = [0];
const width= gameLayer.canvas.width;
const height= gameLayer.canvas.height;
const box_width=100;
const margin_width=20;
//DOM元素
var scoreContainer = document.getElementById('score');
var bestResultContainer = document.getElementById('bestResult');
var gameOverBoard = document.getElementById('gameOverBoard');
var finalScore = document.getElementById('finalScore');
var message = document.getElementById('message');
var finalScore = document.getElementById('finalScore');
var tryAgain = document.getElementById('tryAgain');
//游戏初始化
function initGame(){
	//判断是否更新localStorage
	if (localStorage.bestResult) {
        bestResult = localStorage.bestResult - 0;
    } else {
        bestResult = 0;
    }
    //声明二维数组并且赋值
	for ( var i = 0; i < 4; i++) {
		digital[i]=new Array();              
		for ( var j = 0; j < 4; j++) {
			digital[i][j]=0;
		}
	}
	gameScore = 0;
	gameOverBoard.style.display="none";
	scoreContainer.innerHTML = 0;
	bestResultContainer.innerHTML = bestResult;
	gameLayer.remove();
	numberLayer.remove();
    createRandom();
    drawBack();
    drawDigital();
    createRandom();
    drawBack();
    drawDigital();
}
window.onload = function(){
	initGame();
}
//监听键盘事件
document.onkeydown=function(event){
     var e = event || window.event || arguments.callee.caller.arguments[0];
     //向上移动 Up W
     if(e && (e.keyCode==38||e.keyCode==87)){
     	e.preventDefault();
    	 for ( var i = 0; i <4; i++) {
 			var arr=new Array();
 			arr[0]=digital[i][0];
 			arr[1]=digital[i][1];
 			arr[2]=digital[i][2];
 			arr[3]=digital[i][3];
 			if (!checkDigital(arr)){
 				arr=changeDigital(arr);
 			}
 			digital[i][0]=arr[0];
 			digital[i][1]=arr[1];
 			digital[i][2]=arr[2];
 			digital[i][3]=arr[3];
 		}
 	 if (checkOver()) {
 	 		if(!canMoveUp()){
				gameOver()
			}
		}else{
			refresh();
		}   	
     }
     //向下移动 Down S
     if(e && (e.keyCode==40||e.keyCode==83)){ 
     e.preventDefault();       
        	for ( var i = 0; i <4; i++) {
      			var arr=new Array();
      			arr[0]=digital[i][3];
      			arr[1]=digital[i][2];
      			arr[2]=digital[i][1];
      			arr[3]=digital[i][0];
      			if (!checkDigital(arr)){
      				arr=changeDigital(arr);
      			}
      			digital[i][3]=arr[0];
      			digital[i][2]=arr[1];
      			digital[i][1]=arr[2];
      			digital[i][0]=arr[3];
      		}
      	 if (checkOver()) {
      	 	if(!canMoveDown()){
				gameOver()
			}
     	 }else{
     			refresh();
     		}   	
        }
         //向左移动 Left A
     if(e && (e.keyCode==37||e.keyCode==65)){  
     e.preventDefault();      
    	 for ( var i = 0; i <4; i++) {
    			var arr=new Array();
    			arr[0]=digital[0][i];
    			arr[1]=digital[1][i];
    			arr[2]=digital[2][i];
    			arr[3]=digital[3][i];
    			if (!checkDigital(arr)){
    				arr=changeDigital(arr);
    			}
    			digital[0][i]=arr[0];
    			digital[1][i]=arr[1];
    			digital[2][i]=arr[2];
    			digital[3][i]=arr[3];
    		}
    	 if (checkOver()) {
    	 	if(!canMoveLeft()){
					gameOver()
				}
		}else{
			refresh();
		}   	
     } 
     //向右移动 Right D        
     if(e && (e.keyCode==39||e.keyCode==68)){
     	e.preventDefault();
    	 for ( var i = 0; i <4; i++) {
    		 var arr=new Array();
 			arr[0]=digital[3][i];
 			arr[1]=digital[2][i];
 			arr[2]=digital[1][i];
 			arr[3]=digital[0][i];
 			if (!checkDigital(arr)){
 				arr=changeDigital(arr);
 			}
 			digital[3][i]=arr[0];
 			digital[2][i]=arr[1];
 			digital[1][i]=arr[2];
 			digital[0][i]=arr[3];
  		}
  	  if (checkOver()) {
  	  	if(!canMoveRight()){
					gameOver()
				}
 		}else{
 			refresh();
 		}   	
     }
};
//监听再来一次的按钮点击事件
tryAgain.addEventListener('click', function(){
	initGame();
})
//判断数组是否已排列好
function checkDigital(arr){ 
	var flag=false;
	if (arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
			arr[0]>0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
			arr[0]>0&&arr[1]>0&&arr[2]==0&&arr[3]==0||
			arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]==0||
			arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]>0) {
		flag=true;
	}
	//如果还有空格子或者格子内数值相等 则返回false
	if (arr[0]==arr[1]&&arr[0]!=0||
		arr[1]==arr[2]&&arr[1]!=0||
		arr[2]==arr[3]&&arr[2]!=0||
		arr[3]==arr[4]&&arr[3]!=0
	) {
		flag=false;
	}
	return flag;
}
//移动游戏格子
function changeDigital(arr){
	//判断格子移动方向是否有空格 如果有则让格子进行移动
	for ( var i = 0; i <3; i++) {
		if (arr[i]==0) {
			var temp=arr[i];
			arr[i]=arr[i+1];
			arr[i+1]=temp;
		}
		//如果该位置格子不为空且与移动方向的下一个位置的格子数值相同 则进行合并
		if (arr[i]==arr[i+1]&&arr[i]!=0) {
			// 先该位置的数值计入要增加的分数里并在更新得分
			updateScore(arr[i])
			arr[i]=arr[i]+arr[i+1];
			arr[i+1]=0;
		}
	}
	//对已移动的数组再进行排列检查
	if (checkDigital(arr)){
		return arr;
	}else{
		return changeDigital(arr);
	}
}
//在数值为空的格子里随机生成一个数字
function createRandom(){
	//随机生成一个格子坐标 
	var x=Math.round(Math.random()*3);
	var y=Math.round(Math.random()*3);
	//如果该坐标位置的格子为空，为其填充数字
	if (digital[x][y]==0) {
		//生成一个 2 或 4 的数字 其中2出现的概率为 0.7
		digital[x][y]=Math.random()<0.7? 2 : 4 ;
		//如果生成的格子不为空，则递归 重新生成坐标
	}else{
		createRandom();
	}
}
//绘制游戏数字格子
function drawDigital(){
	//数字字体颜色
	let fontColor = null;
	for ( var i = 0; i < 4; i++) {
		for ( var j = 0; j < 4; j++) {
			//根据格子内的数值为其设置不同的颜色
			if (digital[i][j]>0) {
				//根据格子的位置偏移量
				x=margin_width+i*(box_width+margin_width);
				y=margin_width+j*(box_width+margin_width);
				if(digital[i][j] <= 4){
					fontColor = "#776e65";
				}else{
					fontColor = "#fff";
				}
				//数字贴纸
				let box = new Label()
				box.attr({
				   id:`x${i}y${j}`,
				   text:digital[i][j],
				   fillColor: fontColor,
				   size:[100,100],
				   font: 'bold 40px Arial Microsoft Yahei',
				   lineHeight: 100,
				   textAlign: 'center',
				   pos:[x,y],
				});
			    numberLayer.append(box)  
			}
			//如果格子内的数字达到2048  提示游戏通关
			if(digital[i][j]>=2048){
				message.innerHTML = 'You Win!';
				finalScore.innerHTML = gameScore;
				gameOverBoard.style.display="block";
			}
		}
	}
}
//判断游戏格子的背景颜色
function drawBack(){
	for ( var i= 0; i <4; i++) {
		for ( var j = 0; j < 4; j++) {
			var color="";
			if(digital[i][j]==0){color="#cdc0b4";}
			if(digital[i][j]==2){color="#eee4da";}
			if(digital[i][j]==4){color="#ede0c8";}
			if(digital[i][j]==8){color="#f2b179";}
			if(digital[i][j]==16){color="#f59563";}
			if(digital[i][j]==32){color="#f67c5f";}
			if(digital[i][j]==64){color="#f65e3b";}
			if(digital[i][j]==128){color="#edcf72";}
			if(digital[i][j]==256){color="#edcc61";}
			if(digital[i][j]==512){color="#9c0";}
			if(digital[i][j]==1024){color="#33b5e5";}
			if(digital[i][j]==2048){color="#edc22e";}
			x=margin_width+i*(box_width+margin_width);
			y=margin_width+j*(box_width+margin_width);
			drawRect(x,y,color);
		}
	}
}
//绘制游戏格子
function drawRect(x,y,color){
	let square = new Sprite()
	square.attr({
        size: [100, 100],
        pos: [x, y],
        bgcolor: color,
        borderRadius: 20,
      })
	gameLayer.append(square)
}
//更新游戏得分
function updateScore(goal){
	if (goal === 0) {
		return false;
	}
	//将每次合并数字的得分存入数组
	total.push(goal);
	gameScore += goal;
	bestResult = bestResult < gameScore ? gameScore : bestResult;
	localStorage.bestResult = bestResult;
	scoreContainer.innerHTML = gameScore;
	bestResultContainer.innerHTML = bestResult;
}
//显示游戏得分并更新游戏布局视图
function refresh(){
	let result = total.reduce((tem,item)=>tem+item)
	if(result>0){
		var addition = document.createElement("div");
		addition.classList.add("score-addition");
		addition.textContent = "+" + result;
		scoreContainer.appendChild(addition);
		total = [0];
	}
	gameLayer.remove()
	numberLayer.remove()
	createRandom();
	drawBack();
	drawDigital();	
}
//游戏结束 GG
function gameOver(){
	if(canMoveUp()||canMoveDown()||canMoveLeft()||canMoveRight()){
		return false;
	}else{
		finalScore.innerHTML = gameScore;
		gameOverBoard.style.display="block";
		return true;
	}
}