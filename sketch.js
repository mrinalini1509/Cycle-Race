var path,mainCyclist;
var player1,player2,player3;
var obstacle1, obstacle2, obstacle3;
var pathImg,mainRacerImg1,mainRacerImg2;


var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var OBIMG1, OBIMG2, OBIMG3
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG;

var obstacle1Group, obstacle2Group, obstacle3Group

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  OBIMG1 = loadAnimation("images/obstacle1.png");
  OBIMG2 = loadAnimation("images/obstacle2.png");
  OBIMG3 = loadAnimation("images/obstacle3.png");
  
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  
}

function setup(){
  
createCanvas(550,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.x=path.width /2;
path.velocityX = -(6 + 3*distance/100);
//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver = createSprite(300,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
obstacle1Group = new Group();
obstacle2Group = new Group();  
obstacle3Group = new Group();  
  
}

function draw() {
  background(0);
  
  pinkCyclists.velocityX = -(6 + 2*distance/150);
       yellowCyclists.velocityX = -(6 + 2*distance/150);
       redCyclists.velocityX = -(6 + 2*distance/150);
  
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,400,30);
  
  if(gameState===PLAY){
    
    distance=distance+Math.round(getFrameRate()/50);
  path.velocityX=-(6+2*distance/150);
    
  
   
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
    
    var select_obstcles=Math.round(random(1,3))   
  if(World.frameCount%150==0){
  if(select_obstcles==1){
  spawnObstcle1()
  }else if (select_obstcles==2){
  spawnObstcle2()
  }else{
  spawnObstcle3()
  }
    
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
    if(mainCyclist.isTouching(obstacle1Group)){
  
  gameState=END
  
  }
    
  if(mainCyclist.isTouching(obstacle2Group)){
  
  gameState=END
  
  
  }
  
  if(mainCyclist.isTouching(obstacle3Group)){
  
  gameState=END
  
  }
    
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(15);
    fill("lightblue");
    text("PRESS 'R' TO RESTART THE GAME!", 170,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)

  obstacle1Group.setLifetimeEach(-1)
  obstacle2Group.setLifetimeEach(-1)
  obstacle3Group.setLifetimeEach(-1)
    
    if(keyDown("R")) {
     reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);


  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  obstacle1Group.destroyEach()
  obstacle2Group.destroyEach()
  obstacle3Group.destroyEach()
  
  distance = 0;
}

function spawnObstcle1(){
  obstacle1=createSprite(600,Math.round(random(50,250),10,10))
  obstacle1.addAnimation("obstacle1",OBIMG1)
  obstacle1.velocityX=-(4+2*distance/120)
  obstacle1.scale=0.1
  obstacle1.setLifetime=150
  obstacle1Group.add(obstacle1)
}

function spawnObstcle2(){
  obstacle2=createSprite(600,Math.round(random(50,250),10,10))
  obstacle2.addAnimation("obstacle2",OBIMG2)
  obstacle2.velocityX=-(4+2*distance/120)
  obstacle2.scale=0.1
  obstacle2.setLifetime=150
  obstacle2Group.add(obstacle2)
}

function spawnObstcle3(){
  obstacle3=createSprite(600,Math.round(random(50,250),10,10))
  obstacle3.addAnimation("obstacle3",OBIMG3)
  obstacle3.velocityX=-(4+2*distance/120)
  obstacle3.scale=0.1
  obstacle3.setLifetime=150
  obstacle3Group.add(obstacle3)
}

