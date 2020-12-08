var bananaImage, banana, obstacleImage, obstacle, groupbackground, score, monkeyAnimation, monkey, background, invisGround, gameState, obstacleGroup, bananaGroup;

function preload() {
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  groundbackground = loadImage("jungle.jpg");
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
}

function setup() {
  createCanvas(400, 400);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  background1 = createSprite(200, 200, 600,500);
  background1.addImage(groundbackground);
  background1.velocityX = -2;
  
  monkey = createSprite(50, 338.38, 20,20);
  monkey.addAnimation("running",monkeyAnimation);
  monkey.scale = 0.12;
  
  invisGround = createSprite(200, 390, 400,5);
  invisGround.visible = false;
  
  gameState = 0;
  score = 0;
}

function draw() {
  background(220);
  
  if(gameState == 0){
    
    if(keyDown("space") && monkey.y >= 338.37){
      monkey.velocityY = -5;
    }
    
    if(monkey.y < 310) {
      monkey.velocityY = monkey.velocityY + 0.16;
    }
    
    if(monkey.isTouching(obstacleGroup)) {
     gameState = 1; 
     monkey.overlap(obstacle);
    }
    
    if(monkey.isTouching(bananaGroup)) {
      score++;
      banana.destroy();
    }
    
    if(background1.x <= 0) {
      background1.x = 200;
    }
  }
  else{
    reset();
  }

  monkey.collide(invisGround);
  
  spawnObstacles();
  
  drawSprites();
  textSize(15);
  fill(0, 102, 153);
  text("Score : " + score,330, 25);
}

function spawnObstacles() {
  
  if(frameCount % 90 == 0) {
    obstacle = createSprite(400, 360, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.16;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 95;

    banana = createSprite(obstacle.x, obstacle.y - 130, 20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 95;
    bananaGroup.add(banana);
  }
  
}

function reset() {
  background1.velocityX = 0;
  obstacle.velocityX = 0;
  banana.velocityX = 0;
  banana.lifetime = 0 - 1;
  obstacle.lifetime = -1;
}