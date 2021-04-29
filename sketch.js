//Create variables here
var dogImg,happyDogImg,foodS,foodStock,doggy;
var feedPet,addFood;
var fedTime,lastFed;
var garden,bedroom,washroom;
var readState,gameState;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happyDogImg.png");
  garden = loadImage("images/Garden.png");
  bedroom = loadImage("images/Bed Room.png");
  washroom= loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(500,500);
  
   doggy = createSprite(250,300,50,100);
  doggy.addImage("doggy",dogImg);
  doggy.addImage("happy",happyDogImg);
  doggy.scale = 0.1;

database=firebase.database();
foodObj = new Foody();

   foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState').on('value',function(data){
    gameState = data.val();
  })

}


function draw() {  
 // background(46, 139, 87) ;
currentTime = hour();
console.log(currentTime+' '+' '+lastFed);
if(currentTime==(lastFed+1)){
  update('PLAYING');
  foodObj.garden();
}
else if(currentTime==(lastFed+2)){
  
  update('SLEEPY');
  foodObj.bedRoom();
}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update('BATHING');
  foodObj.washRoom();
}else{
  update('HUNGRY');
  foodObj.display();
}
if(gameState!='HUNGRY')
{
  feed.hide();
  addFood.hide();
  doggy.remove();
}else{
  feed.show();
  addFood.show();
  doggy.addImage(happyDogImg);
}
  drawSprites();
  //add styles here

}
function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

// function writeStock(x)
// {
//   if(x<=0){
//     x-0
//   }else{
//     x=x-1;
//   }
//   database.ref('/').update({Food:x})
// }

function feedDog(){
  doggy.changeImage("happy",happyDogImg);
if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}else
{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
  
  database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(State){
  database.ref('/').update({
    gameState:State
 })
}