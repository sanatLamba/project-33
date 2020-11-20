var dog, happyDog,dogImg;
var foodS, foodStock;
var dataBase;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  //dataBase = firebase.database;
  foodStock = dataBase.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(200,270,50,50);
}


function draw() {  
  background(46, 139, 87);

  dog.addImage("dog",dogImg);
  dog.scale = 0.2;

  if(keyWentDown(UP_ARROW)){
    writeStock(0,-1);
    writeStock(foodS);
    dog.addImage(happyDog)
  }

  drawSprites();
  
  text("food remaining:",dataBase,200,170);

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x <= 0){
    x=0;
  }else{
    x=x-1;
  }
  dataBase.ref('/').update({
    food:x
  })
}