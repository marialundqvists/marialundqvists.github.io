//create an empty object
 const playerShipSpeed = 200;

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
 
    
    mainGameState.updatePlayer();
}

mainGameState.updatePlayer = function() {
       
    
     //move player
    if (this.cursors.right.isDown) {
    console.log("RIGHT PRESSED");
    this.playerShip.body.velocity.x = playerShipSpeed;
    } else if (this.cursors.left.isDown) {
          console.log("left pressed");
          this.playerShip.body.velocity.x = -playerShipSpeed;
    } else {
          console.log("no pressed");
           this.playerShip.body.velocity.x = 0;
    }

    //  confine player to the screen
    if (this.playerShip.position.x < (0 + (this.playerShip.width/2)) && this.cursors.left.isDown) {
    this.playerShip.body.velocity.x = 0;
    }

    if (this.playerShip.position.x > (game.width - (this.playerShip.width/2)) && this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = 0;
    }
}
   
