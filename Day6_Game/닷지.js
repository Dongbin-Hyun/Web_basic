var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ship = document.getElementById("ship");


var b_list = [ [0, 0, 2, 2] ];
var bullet_r = 2;
var b_count = 1;

var buffer =  [ 0, 0, 0, 0 ];
var character = [800/2-5, 600/2-5, 8];

setInterval(update, 10);

var time = 0;

function gameInit(){
	b_list = [ [0, 0, 2, 2] ];
	b_count = 1;
	buffer =  [ 0, 0, 0, 0 ];
	character = [800/2-5, 600/2-5, 8];
	time = 0;
}

function drawBackground(ctx){
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 800, 600);
	ctx.fill();
}

function checkCrash(x, y){
	var c_r = character[2];
	var c_x = character[0] + c_r/2;
	var c_y = character[1] + c_r/2;
	

	if( (x-c_x)*(x-c_x) + (y-c_y)*(y-c_y)  < (c_r+2)*(c_r+2) )
		return 1;
	else return 0;
}

function drawBullet(b_count, ctx){	
	for(var i=0;i<b_count;i++){
		ctx.beginPath();

 		b_list[i][0]+=b_list[i][2];
 		b_list[i][1]+=b_list[i][3];

 		if(b_list[i][0] > 800){
 			b_list[i][0] = 800;
 			b_list[i][2] *= -1;
 			b_list[i][3] += Math.random()%2;
 		}
 		if(b_list[i][0] < 0){
 			b_list[i][0] = 0;
 			b_list[i][2] *= -1;
 			b_list[i][3] += Math.random()%2;
 		}
 		if(b_list[i][1] > 600){
 			b_list[i][1] = 600;
 			b_list[i][3] *= -1;
 			b_list[i][2] += Math.random()%2;
 		}
		if(b_list[i][1] < 0){
 			b_list[i][1] = 0;
 			b_list[i][3] *= -1;
 			b_list[i][2] += Math.random()%2;
 		}

 		if(checkCrash(b_list[i][0], b_list[i][1])){
 			alert("충돌해쩌염 ㅠㅠ \n 스코어는 " + time + " 입니다.");
 			gameInit();
 		}

		ctx.fillStyle = "white";
 		ctx.arc(b_list[i][0], b_list[i][1], bullet_r, 0 , 2*Math.PI);
 		ctx.fill();
	 }
}

function makeBullet(){
	if(time%30==0){
		var type = Math.floor(Math.random()*4);
		var dir;
		if( (Math.floor(Math.random()*100))%2 == 0 )
			dir = 1;
		else 
			dir = -1;
	//alert(type);
		if(type == 0)
			b_list[b_count] = [Math.floor(Math.random()*800), 2, dir*2, 2];
		else if(type == 1)
			b_list[b_count] = [Math.floor(Math.random()*800), 598, dir*2, -2];
		else if(type == 2)
			b_list[b_count] = [2, Math.floor(Math.random()*600), 2, dir*2];
		else
			b_list[b_count] = [798, Math.floor(Math.random()*600), -2, dir*2];
		
		b_count++;
 	}
}

function moveCharater(){
	if(buffer[0] == 1) character[1]-=4;
	if(buffer[1] == 1) character[1]+=4;
	if(buffer[2] == 1) character[0]-=4;
	if(buffer[3] == 1) character[0]+=4;
}

function drawCharacter(){
	ctx.beginPath();
	//ctx.fillStyle = "white";
	//ctx.arc(character[0]+7, character[1]+7, character[2], 0 , 2*Math.PI);
	//ctx.fill();

	ctx.beginPath();
	ctx.drawImage(ship, character[0], character[1]);
	ctx.fill();
}

function drawScore(){
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.translate(100, 50);
	ctx.font = 20 + "px arial";
	ctx.textBaseline="middle";
  	ctx.textAlign="center";
	ctx.fillText("Score : " + time.toString(), 0, 0);
	ctx.fill();
	ctx.translate(-100, -50);
}

function update() {
	time = time+1;
	drawBackground(ctx);
	drawBullet(b_count, ctx);
	moveCharater();
	drawCharacter();
	drawScore();
	makeBullet();
}

function keyup(){
	if(event.keyCode == 38) buffer[0] = 0;
	if(event.keyCode == 40) buffer[1] = 0;
	if(event.keyCode == 37) buffer[2] = 0;
	if(event.keyCode == 39) buffer[3] = 0;
}
function keydown(){
	if(event.keyCode == 38) buffer[0] = 1;
	if(event.keyCode == 40) buffer[1] = 1;
	if(event.keyCode == 37) buffer[2] = 1;
	if(event.keyCode == 39) buffer[3] = 1;
}