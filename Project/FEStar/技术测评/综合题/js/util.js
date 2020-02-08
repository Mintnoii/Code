//判断往指定方向移动能否继续游戏
function canMoveLeft(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(digital[i][j]!=0){
				if(digital[i-1][j]==0||digital[i-1][j]==digital[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(digital[i][j]!=0){
				if(digital[i+1][j]==0||digital[i+1][j]==digital[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(){
	for(var j=3;j>0;j--){
		for(var i=0;i<4;i++){
			if(digital[i][j]!=0){
				if(digital[i][j-1]==0||digital[i][j-1]==digital[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(){
	for(var j=0;j<3;j++){
		for(var i=0;i<4;i++){
			if(digital[i][j]!=0){
				if(digital[i][j+1]==0||digital[i][j+1]==digital[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否所有格子都不为空
function checkOver(){
	for ( var i = 0; i < 4; i++) {
		for ( var j = 0; j < 4; j++) {
			if (digital[i][j]==0) {
			    return false;
			}
		}
	}
	return true;
}