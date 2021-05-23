var g,gimg;
var t,timg;
var gm;
var d,c;
var go1; 
var go2
var gd;
var gc;
function preload (){
  timg = 
    loadImage("tower.png");
  gimg =
    loadImage("ghost-standing.png");
  d =
    loadImage("door.png");
  c = 
    loadImage("climber.png");
}

function setup (){
  createCanvas (400,700);
  t=createSprite(200,350,20,20);
  t.addImage(timg);
  t.scale=0.7
  g=createSprite(200,450,20,20);
  g.addImage(gimg);
  g.scale=0.2
  gm="start";
  go1=new Group();
  go2=new Group();
  gd=new Group();
  gc=new Group();
  g.setCollider("rectangle",0,0,50,50);
  }

function draw (){
  background("gray");
  drawSprites();
  if(gm==="start"&&keyDown("space")){
    gm="play"
  }
  
  if(gm==="play"){
    t.velocityY=3;
    console.log(t.height);
    console.log(t.y);
    if(t.y>550){
      t.y=t.height/4;
    }
    if(keyDown("space")){
      g.velocityY=-5;
    }
    g.velocityY=g.velocityY+0.5
    
    if(keyDown("right")){
      g.x=g.x+5;
    }
    if(keyDown("left")){
      g.x=g.x-5;
    }
    obs();
    if (g.isTouching(go1)){
      g.velocityY=0;
    }
    if (g.isTouching(go2)){
      gm="end";
    }
  }
   
  
  if(gm==="end"){
    g.velocityY=5;
    t.velocityY=0;
    gc.setVelocityYEach(0);
    gd.setVelocityYEach(0);
    go1.setVelocityYEach(0);
    go2.setVelocityYEach(0);
    fill("yellow");
    text ("Press Enter to restart",100,300);
    if (keyDown("Enter")){
      restart();
    }
  }
}

function obs (){
  if(frameCount%70===0){
     var wii =createSprite(random(50,350),0,20,20);
    wii.addImage(d);
    wii.velocityY=3;
    var wi=createSprite(wii.x,wii.y+50,20,20);
    wi.velocityY=3;
    wi.addImage(c);
    wii.depth=g.depth;
    wi.depth=g.depth;
    g.depth=g.depth+1;
    var o1=createSprite(wi.x,wi.y-10,100,10);
    o1.velocityY=3;
    go1.add (o1);
    var o2=createSprite(wi.x,wi.y+10,100,10);
    o2.velocityY=3;
    go2.add (o2);
    gc.add (wii);
    gd.add (wi);
    o2.visible=false;
     }
}

function restart (){
  gm="start";
  gc.destroyEach();
  gd.destroyEach();
  go1.destroyEach();
  go2.destroyEach();
  g.y=450;
  g.x=200;
  g.velocityY=0;
}