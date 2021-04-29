class Foody{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
    return this.foodStock
    }

    updateFoodStock(Food){
       this.foodStock = Food; 
    
    }
    
    deductFood(){
if(this.foodStock>0){
this.foodStock = this.foodStock-1;
}
    }
    getFedTime(lastFed){
        this.lastFed = lastFed
    }

    bedRoom(){
        background(bedroom,550,500);
    }
    garden(){
        background(garden,550,500);
    }
    washRoom(){
        background(washroom,550,500);
    }

    display(){
       
        var x = 80,y =100;
        background(46,139,87);
        textSize(20);
        fill('red');
      text("FOOD REMAINING : "+foodS,150,200);
      //text("PRESS THE ' UP ARROW' TO FEED THE DOG",250,);
      fedTime = database.ref('FeedTime');
      fedTime.on("value",function(data){
          lastFed=data.val();
            
      });
      
      fill(255,255,254);
      textSize(15);
      if(lastFed>=12){
        text("Last Feed : "+lastFed%12+"PM",350,30);
      }else if(lastFed == 0){
        text("Last Feed : 12 AM", 350,30);
      }else{
        text("Last Feed : "+lastFed + "AM",350,30);
      }

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!= 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30
            }
        }
    }
}