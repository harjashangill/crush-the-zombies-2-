const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var backgroundImg
var zombiesImg
var stonesImg
var linkImg
var zombie
var stones = [];



function preload(){
zombiesImg = loadImage("./assets/zombie.png")
backgroundImg = loadImage("./assets/background.png")
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(50, height / 2, 300, 100, "#8d6e63", true);
  rightWall = new Base(width - 50, height / 2, 300, 100, "#8d6e63", true);

  bridge = new Bridge(20, { x: width / 2 - 700, y: height / 2-50 });
  jointPoint = new Base(width - 200, height / 2, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);

    
  }
  zombie = createSprite(width/2-500,height-110)
    zombie.addAnimation("LeftToRight",zombiesImg)
    zombie.scale = 0.2
    zombie.velocityX = 10

    breakButton = createButton("")
    breakButton.position(width-200,height/2-50)
    breakButton.class("breakButton")
    breakButton.mousePressed(handleButtonPress)
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var stone of stones) {
    stone.show();
  }


  drawSprites()
}
function handleButtonPress(){

  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}