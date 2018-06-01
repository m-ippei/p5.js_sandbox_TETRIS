var minos = [
	[
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0],
		[0,0,0,0]
	],[
		[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],[
		[0,0,0,0],
		[1,1,0,0],
		[0,1,1,0],
		[0,0,0,0]
	],[
		[0,0,0,0],
		[0,0,1,1],
		[0,1,1,0],
		[0,0,0,0]
	],[
		[0,0,1,0],
		[0,0,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],[
		[0,1,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,0,0]
	],[
		[0,0,0,0],
		[0,1,0,0],
		[1,1,1,0],
		[0,0,0,0]
	]
]

var Field = [
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,0,0,0,0,0,0,0,0,0,0,9],
	[9,9,9,9,9,9,9,9,9,9,9,9],
]

var colors = [
	"#fff353",
	"#d685b0",
	"#dbe159",
	"#7fc2ef"
]

var mino  = {
	"shape":[],
	"color":"",
	"X":0,
	"Y":0
}

function createMino(){
	mino.shape = random(minos)
	mino.color = random(colors)
	mino.X = 4
	mino.Y = 0
}

function setup() {
  createCanvas(120, 220);
	frameRate(4)
	createMino()
	stroke(70)
}

function draw() {
  background(220);
	deleteLines()
	
	moveMino("DOWN")
	
	drawField()
  drawMino()
}

function deleteLine(){
	arr = deleteLines()
}

function moveMino(dir){
	switch(dir) {
		case "LEFT":
			mino.X -= 1
			if(tryMove()===false){
				mino.X += 1
			}
			break;
		case "RIGHT":
			mino.X += 1
			if(tryMove()===false){
				mino.X -= 1
			}
		  break;
		case "DOWN":
			mino.Y += 1
			if(tryMove()===false){
				mino.Y -= 1
				put_inField()
				mino.Y = 0
				mino.X = 4
				createMino()
			}
			break;
		default:
			move("DOWN")
	}
}


function rotateMino(dir){
	if (dir===undefined){dir="RIGHT"}
	var keepMino = mino.shape
	var rotatedMino = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if      (dir==="RIGHT"){
				rotatedMino[i][j] = mino.shape[3-j][i]
			}else if(dir==="LEFT"){
				rotatedMino[i][j] = mino.shape[j][3-i];
			}
		}
	}
	mino.shape = rotatedMino
	if(tryMove()===false){
		mino.shape = keepMino
	}
}

function keyReleased(){
	if(keyCode===38){
		rotateMino("RIGHT")
	}else if(keyCode===90){
		rotateMino("LEFT")
	}else if(keyCode===39){
		moveMino("RIGHT")
	}else if(keyCode===37){
		moveMino("LEFT")
	}
}

function Delete(num) {
	var arr = Field.slice(0,num)
	var arr2 = Field.slice(num+1,21)
	arr = arr.concat(arr2)
	arr.unshift([9,0,0,0,0,0,0,0,0,0,0,9])
	Field = arr
}

function checkArr(arr) {
	for(var i = 0; i < 11;i++){
		if(arr[i] === false){
			return false
		}
	}
	return true
}

function doDelete(arr) {
	for(var i = 1; i<=arr.length;i++){
		Delete(arr[i])
	}
}

function deleteLines(){
	var queueDeleteArr = []
	for(var i=0;i<22;i++){
		var arr = [false,false,false,false,false,false,false,false,false,false]
		for(var j=1;j<11;j++){
			if(typeof Field[i][j] === "string"){
				arr[j] = true
			}
		}
		if(checkArr(arr)){
			append(queueDeleteArr,i)
		}
	}
	doDelete(queueDeleteArr)
}

function put_inField() {
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			if(mino.shape[i][j]){
				Field[mino.Y+i][mino.X+j] = mino.color
			}
		}
	}
}

function tryMove(){
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			if((mino.Y+i)<22){
				if((typeof Field[mino.Y+i][mino.X+j] === "string") && mino.shape[i][j]){
					return false;
				}
				if(Field[mino.Y+i][mino.X+j] > 0 && mino.shape[i][j] > 0){
					return false;
				}
			}
		}
	}
	return true;
}

function drawMino(){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(mino.shape[i][j]){
				fill(mino.color)
				rect((j+mino.X)*10,(i+mino.Y)*10,10,10)
			}
		}
	}
}

function drawField(){
	for(var i=0;i<12;i++){
		for(var j=0;j<22;j++){
			if(Field[j][i] === 0){
				fill(240)
			}else if(Field[j][i] === 1){
				fill(30,150,200)
			}else if(Field[j][i] === 9){
				fill("#eabf4c")
			}else if(typeof Field[j][i] === "string"){
				fill(Field[j][i])
			}else{
			}
			rect(i*10,j*10,10,10)
		}
	}
}
