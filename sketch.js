var ground, groundImage
var obsGroup
var mario, marioImage
var rock1Image, rock2Image
var backgroundImage
var invisground
var gamestate = 0
var bgimage, bg
var play, playimage


function preload(){
  groundImage = loadImage("groundImg.png")
  marioImage = loadImage("mario.png")
  rock1Image = loadImage("rock1.png")
  rock2Image = loadImage("rock2.png")
  backgroundImage = loadImage("back.jpeg")
  bgimage = loadImage("white background.jpeg")
  playimage = loadImage("playimg1-removebg-preview.png")
}
function setup(){
  createCanvas(1000,600)
  ground = createSprite(500,530,1000,20)
  ground.addImage(groundImage);
  ground.velocityX=-6
  ground.x=ground.width/2
  ground.scale=2.5

  obsGroup=new Group()

  mario = createSprite(100,420,40,40)
  mario.addImage(marioImage)
 
mario.scale = 0.2
  invisground = createSprite(500,500,1000,20)
  bg = createSprite(500,300,1000,600)
  bg.addImage(bgimage)
  play = createSprite(500,400,70,30)
  play.addImage(playimage)
  bg.visible = false
  play.visible = false
invisground.visible = false
mario.setCollider("circle",0,0,30)
mario.debug = false;
  
  
}
function draw(){
  if(gamestate === 0){
    bg.visible = true
    play.visible = true
    mario.visible = false
    ground.visible = false
    obsGroup.visible = false
    if(mousePressedOver(play)){
      gamestate = 1
    }
  }
  if(gamestate === 1){
    background(backgroundImage)
    mario.visible = true
    ground.visible = true
    obsGroup.visible = true
    bg.visible = false 
    play.visible = false
    if(ground.x<0){
      ground.x = ground.width/2
      }

    if(keyDown(UP_ARROW)&&mario.y>=450){
      mario.velocityY = -10

    }
    mario.velocityY = mario.velocityY+0.5

    if(keyDown(LEFT_ARROW)){
      mario.velocityX = -5
    }

    if(mario.isTouching(obsGroup)){
     gamestate = 2
      }
      spawnobs()
  }
  if(gamestate === 2){
    ground.velocityX = 0
    mario.velocityY=0
    obsGroup.setVelocityXEach(0)
  }

 mario.collide(invisground)

   

  drawSprites()
}
function spawnobs(){

  if(frameCount%60===0){
    var obstacles = createSprite(1000,500,10,10)
    obstacles.velocityX = -5
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacles.addImage(rock1Image);
      break;
      case 2: obstacles.addImage(rock2Image);
      break;
      default: break;
    }
    obstacles.scale = 0.5
    obsGroup.add(obstacles);
  }
  }