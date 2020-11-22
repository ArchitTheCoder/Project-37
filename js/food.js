class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock() {
        return this.foodStock
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1
        }
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed
    }



    display() {
        var x = 80, y = 100
        imageMode(CENTER)

        fill("white")

        textSize(15)
        if (lastFed >= 12) {
            text("Last fed:" + lastFed % 12 + "PM", 350, 30)
        } else if (lastFed === 0) {
            text("Last fed: 12 AM", 350, 30)
        } else {
            text("Last fed:" + lastFed + "AM", 350, 30)
        }

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80
                    y = y + 50
                }
                image(this.image, x, y, 50, 50)
                x = x + 30
            }
        }
    }
    bedroom() {
        background(bedroomIMG, 550, 550)
    }

    garden() {
        background(gardenIMG, 550, 550)
    }

    washroom() {
        background(washroomIMG, 550, 550)
    }
}