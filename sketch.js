//Create variables here
var sadDog, happyDog, database, foodS, foodStock, foodCount, readState;
var addFood, feed, lastFed;
var foodObj;

var bedroomIMG, washroomIMG, gardenIMG, currentTime;

var DOG;

var food, gameState;

function preload() {

  sadDog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happy dog.png")

  bedroomIMG = loadImage("images/BedRoom.png")
  washroomIMG = loadImage("images/WashRoom.png")
  gardenIMG = loadImage("images/Garden.png")

}

function setup() {
  database = firebase.database()

  createCanvas(1000, 500);

  DOG = createSprite(800, 250, 20, 20)
  DOG.addImage(sadDog)
  DOG.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock)

  foodObj = new Food()

  feed = createButton("Feed The Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)

  readState = database.ref('gameState')
  readState.on("value", function (data) {
    gameState = data.val
  })

  fedTime = database.ref("feedTime")
  fedTime.on("value", function (data) {
    lastFed = data.val()
  })


}


function draw() {
  background(46, 139, 87)



  currentTime = hour();

  if (currentTime == (lastFed + 1)) {

    update("Playing");
    foodObj.garden();
  } else if (currentTime == (lastFed + 2)) {

    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {

    update("Bathing");
    foodObj.washroom();
  } else {

    update("Hungry")
    foodObj.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    DOG.remove()
  } else {
    feed.show();
    addFood.show();
    DOG.addImage(sadDog)
  }

  drawSprites();


  


}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}



function feedDog() {
  DOG.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    feedTime: hour(),
    gameState: "Hungry"
  })
}

function addFoods() {
  foodS++
  database.ref('/').update({
    food: foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}