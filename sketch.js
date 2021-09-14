var backgroundImage
var character_running
var clockImage
var coinImage
var monsterImage

var score = 0;

var count = 0;

var gameState = "play";

function preload(){
backgroundImage = loadImage("assets/background.gif")
clockImage = loadImage("assets/clock.png")
coinImage = loadImage("assets/coin.png")
monsterImage = loadImage("assets/monster.png")
gameOverImage = loadImage("assets/gameoverImage.png")
restartImage = loadImage("assets/restartIcon.png")
character_running = loadAnimation("assets/character1.png","assets/character2.png",
"assets/character3.png", "assets/character4.png","assets/character5.png", "assets/character6.png");

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundSprite = createSprite(width/2,height/2);
  backgroundSprite.scale = 2
  backgroundSprite.addImage(backgroundImage);


  character = createSprite(100, height-100, 50 , 100);
  character.addAnimation("running", character_running);
  character.scale = 0.25;

  gameOver = createSprite(width/2,height/2)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.2
  restart = createSprite(width/2,height/2 + 200)
  restart.addImage(restartImage)
  restart.scale = 0.2
  
  invisibleGround = createSprite(width/2,height-50,width,50);
  invisibleGround.shapeColor = "white";

  coinGroup1 = new Group();

  
  coinGroup2 = new Group();

  obstaclesGroup= new Group();
  
}

function draw() {
  background("white");

  if(gameState === "play"){

    gameOver.visible = false;
    restart.visible = false;
    backgroundSprite.velocityX = -(4 + score/100);

    console.log(backgroundSprite.x);
  
    if(backgroundSprite.x<600 ){
      backgroundSprite.x = backgroundSprite.width/2;
    }
  
    if(keyDown("space") && character.y > height/4){
      character.velocityY = -10
    }
  
    character.velocityY = character.velocityY +0.5;

    spawnCoins1();
    spawnCoins2();
    spawnObstacles();

  if(coinGroup1.isTouching(character)){
    coinGroup1.destroyEach();
    score = score +100;
  }

  
  if(coinGroup2.isTouching(character)){
    coinGroup2.destroyEach();
    score = score +100;
  }

  if(obstaclesGroup.isTouching(character)){
      
    
  count++;

  obstaclesGroup.destroyEach();

  switch(count){
    case 1: character.scale = 0.15;

              break;

    case 2 : character.scale = 0.1;

             break;

    case 3 : character.scale = 0.05;

             break;

    default : break;
  }
    
  }

  if(count > 3){
    gameState = "end"
  }

  }

 else if(gameState === "end"){
  backgroundSprite.velocityX = 0;

  coinGroup1.destroyEach();
  coinGroup2.destroyEach();

  obstaclesGroup.destroyEach();

  character.destroy();

  gameOver.visible = true;
  restart.visible = true;

  if(mouseClicked()){
   reset();
  }
 }


 

  character.collide(invisibleGround);

  
  drawSprites();

  fill("red");

  textSize(22);

  text("score = " + score,width - 200,50)

}

function spawnCoins1(){

  if(frameCount % 100 === 0){
    var coin = createSprite(width,height/2 -100);

    coin.addImage(coinImage);

    coin.scale = 0.25;
    coin.velocityX = -(4 + score/100);
    coin.y = Math.round(random(200,height/2));

    coin.lifetime = 400;

    coinGroup1.add(coin);

  }

}

function spawnCoins2(){

  if(frameCount % 50 === 0){
    var coin = createSprite(width,height/2 -100);

    coin.addImage(coinImage);

    coin.scale = 0.25;
    coin.velocityX = -(4+score/100);
    coin.y = Math.round(random(200,height/2));

    coinGroup2.add(coin);

    coin.lifetime = 400;

  }

}


function spawnObstacles(){

  if(frameCount % 110 === 0){
    var obstacles = createSprite(width,height - 200);

    obstacles.addImage(monsterImage);

    obstacles.scale = 0.25;
    obstacles.velocityX = -(4 +score/100);
    obstacles.y = Math.round(random(height - 200,height - 100));

    obstaclesGroup.add(obstacles);

    obstacles.lifetime = 400;

  }

}


function reset(){

  gameState = "play";

  gameOver.visible = false;
  restart.visible = false;

  character = createSprite(100, height-100, 50 , 100);
  character.addAnimation("running", character_running);
  character.scale = 0.25;

  score = 0;
}