var input , gameState
var button
var start,startimage
var road, roadimge
var player,player2
var invisibleground
var time
var racerimage1,racerimage2
var obstaclegrp;
var a=0;
function preload(){
startimage= loadImage("start.png");
roadimage= loadImage("track.jpg");
racerimage1 = loadImage("racer1.png")
racerimage2 = loadImage("moto.png")
racerimage3=loadImage("racer_fell.png")
obstacleimage=loadImage("obstacle1.png")
obstacleimage2=loadImage("obstacle2.png");
}

function setup() {
  createCanvas(displayWidth-30,displayHeight-100);
 input=createInput()
 gameState = "start"
start  = createSprite(700,400,1,1);
road = createSprite(displayWidth/2,displayHeight/2,1,1)
player = createSprite(100,650,1,1)
player.setCollider("rectangle",0,0,120,40);
//player.debug=true;
player2 = createSprite(100,650,1,1)
//player2.debug=true;
invisibleground= createSprite(displayWidth/2,displayHeight-100,displayWidth,10)
invisibleground.visible=false;

obstaclegrp=new Group();
}


function draw() {
  background(100);  
if  (gameState === "start"){
  input.position(300,400);
  start.addImage(startimage)
  start.scale = 0.5;
 if (mousePressedOver(start)){
   gameState = "PLAY"
 }
 drawSprites();
}
if(gameState === "PLAY"){
  player.addImage("player",racerimage1)
  player.scale = 2
  input.hide()
  start.destroy()
  background("black")
  road.addImage(roadimage);
  road.scale = 1.5
 
  if(keyDown(UP_ARROW)&& player.y>350){
    player.velocityY = -5
  player.velocityX = 0
  road.velocityX = -20;


  }
  if(keyDown(UP_ARROW)){
    player.addImage("player",racerimage2)
    player.scale=1.5
  }
 
  if(road.x<0){
    road.x= road.width/2;
  }
 // console.log(player.y)
  player.velocityY=player.velocityY+0.1
    player.collide(invisibleground)

   if (keyWentDown(RIGHT_ARROW)){
    player.velocityY = 0
    player.velocityX = 8
   } 
   if (keyWentUp(RIGHT_ARROW)){
    player.velocityY =0 ;
    player.velocityX =0;
  }
  drawSprites();
time=Math.round(frameCount/20)
text("Time"+time,1000,50)

if(player.x>displayWidth-100){
  player.x=500
}
obstacles();
if(obstaclegrp.isTouching(player)){
  a=1
 console.log(a)
  player.velocityX=0;
  player.velocityY=0;
  road.velocityX=0;
  obstaclegrp.setVelocityXEach(0)
}
if(a===1){
  player.visible=false;
  player2.x=player.x;
  player2.y=player.y;
player2.addImage(racerimage3)
player2.setCollider("rectangle",0,0,100,40)
}
}

  

}
function obstacles(){
  if(frameCount%200===0){
  var obstacle=createSprite(1200,600,80,80)
  //obstacle.debug=true;
  obstacle.scale=0.5;
  obstacle.setCollider("rectangle",0,0,200,40);
  var rand=Math.round(random(1,2));
  switch(rand)
{
  case 1: obstacle.addImage(obstacleimage);
  break;
  case 2 : obstacle.addImage(obstacleimage2);
  break;
  default:break;
}  
  
  obstaclegrp.add(obstacle)
   
  obstaclegrp.setVelocityXEach(-20)
}
}