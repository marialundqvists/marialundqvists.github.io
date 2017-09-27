//create an empty object
var mainGameState = { }

//Add the preloader function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space-bg.jpg"); 
    this.game.load.image("player-ship", "assets/images/player-ship.png");
  
}

//Add the create function
mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'space-bg');
    console.log(game.time.totalElapsedSeconds());
    
    //position of playership
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.8;

  
    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    
    
    //support to press keys
    game.physics.arcade.enable(this.playerShip);
    this.cursors = game.input.keyboard.createCursorKeys();
    
  
   
    
}

//Add the update function
mainGameState.update = function() { 

    //what happens when right and left is pressed on keyboard
      if (this.cursors.right.isDown) {
        console.log("RIGHT PRESSED");
        this.playerShip.body.velocity.x = 200;
      } else if (this.cursors.left.isDown) {
              console.log("left pressed");
              this.playerShip.body.velocity.x = -200;
      } else {
              console.log("no pressed");
               this.playerShip.body.velocity.x = 0;
      }
}
