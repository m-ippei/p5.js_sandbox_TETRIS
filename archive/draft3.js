function setup() {
  createCanvas(120, 220);
	frameRate(1)
}

function draw() {
  background(220);
	drawField()
	if(createBlock(0,4)===false){
		fill(255,0,0)
		text("GameOver",30,110)
	}else{
		fill(255,0,0)
		text("NowPlay",30,110)
	}
}

function createBlock(x,y) {
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(field[x+j][y+i]>0){
				return false
			}
		}
	}
	for(var k=0;k<4;k++){
		for(var l=0;l<4;l++){
			if(mino[k][l]){
				field[x+k][l+y] = mino[k][l]
			}
		}
	}
	/*
	field[x][4] = mino[1][0]
	field[x][5] = mino[1][1]
	field[x][6] = mino[1][2]
	field[x][7] = mino[1][3]
	*/
}

function drawField(){
	for(var i=0;i<12;i++){
		for(var j=0;j<22;j++){
			if(field[j][i] === 1){
				fill(0,200,200)
			}else if(field[j][i] === 2){
				fill(30,150,200)
			}else if(field[j][i] === 3){
				fill(30,200,100)
			}else{
				fill(100,100,0)
			}
			rect(i*10,j*10,10,10)
		}
	}
}

var field = [
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
]

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

var mino = minos[0]
